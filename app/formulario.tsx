import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "./lib/supabase";

// ── Tipos ──────────────────────────────────────────────────────────────────
type Genero = "Masculino" | "Femenino" | "Otro" | "";

interface FormData {
  nombre: string;
  apellido: string;
  edad: string;
  correo: string;
  telefono: string;
  programa: string;
  ciudad: string;
  genero: Genero;
  semestre: string;
  aceptarTerminos: boolean;
}

// ── Campo definido FUERA del componente principal ─────────────────────────
// Esto evita que se pierda el foco al escribir (el bug de "una letra y sale")
interface CampoProps {
  label: string;
  value: string;
  onChangeText: (val: string) => void;
  placeholder: string;
  error?: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "words" | "sentences";
}

function Campo({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = "default",
  autoCapitalize = "words",
}: CampoProps) {
  return (
    <View style={styles.campoWrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder={placeholder}
        placeholderTextColor="#aab0bc"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

// ── Componente principal ───────────────────────────────────────────────────
export default function FormularioEstudiante() {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    nombre: "",
    apellido: "",
    edad: "",
    correo: "",
    telefono: "",
    programa: "",
    ciudad: "",
    genero: "",
    semestre: "",
    aceptarTerminos: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [cargando, setCargando] = useState(false);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const validarCorreo = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validarTexto = (texto: string) =>
    /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(texto);

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // ── Validación ────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    else if (!validarTexto(form.nombre)) newErrors.nombre = "Solo letras";

    if (!form.apellido.trim()) newErrors.apellido = "El apellido es requerido";
    else if (!validarTexto(form.apellido)) newErrors.apellido = "Solo letras";

    if (!form.edad || isNaN(Number(form.edad)) || Number(form.edad) < 1)
      newErrors.edad = "Edad inválida";

    if (!validarCorreo(form.correo)) newErrors.correo = "Correo inválido";

    if (!form.telefono || isNaN(Number(form.telefono)))
      newErrors.telefono = "Teléfono inválido";

    if (!form.programa.trim()) newErrors.programa = "El programa es requerido";

    if (!form.semestre || isNaN(Number(form.semestre)))
      newErrors.semestre = "Semestre inválido";

    if (!form.ciudad.trim()) newErrors.ciudad = "La ciudad es requerida";

    if (!form.genero) newErrors.genero = "Selecciona un género";

    if (!form.aceptarTerminos)
      newErrors.aceptarTerminos = "Debes aceptar los términos";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Guardar en Supabase ───────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setCargando(true);

      const { data, error } = await supabase
        .from("estudiantes")
        .insert([
          {
            nombre: form.nombre,
            apellido: form.apellido,
            edad: Number(form.edad),
            correo: form.correo,
            telefono: form.telefono,
            programa: form.programa,
            semestre: Number(form.semestre),
            ciudad: form.ciudad,
            genero: form.genero,
            aceptar_terminos: form.aceptarTerminos,
          },
        ])
        .select();

      if (error) {
        alert(error.message);
        return;
      }

      const estudiante = data?.[0];

      router.push({
        pathname: "/detalle",
        params: {
          id: String(estudiante.id),
          nombre: estudiante.nombre,
          apellido: estudiante.apellido,
          edad: String(estudiante.edad),
          correo: estudiante.correo,
          telefono: estudiante.telefono,
          programa: estudiante.programa,
          semestre: String(estudiante.semestre),
          ciudad: estudiante.ciudad,
          genero: estudiante.genero,
        },
      });
    } catch (e) {
      console.log(e);
      alert("Error inesperado");
    } finally {
      setCargando(false);
    }
  };

  const resetForm = () => {
    setForm({
      nombre: "",
      apellido: "",
      edad: "",
      correo: "",
      telefono: "",
      programa: "",
      ciudad: "",
      genero: "",
      semestre: "",
      aceptarTerminos: false,
    });
    setErrors({});
  };

  const generos: Genero[] = ["Masculino", "Femenino", "Otro"];

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Menú de navegación */}
        <View style={styles.menuContainer}>
          <Pressable
            style={styles.menuBoton}
            onPress={() => router.push("/formulario")}
          >
            <Text style={styles.menuTexto}>📝 Formulario</Text>
          </Pressable>
          <Pressable
            style={styles.menuBoton}
            onPress={() => router.push("/lista")}
          >
            <Text style={styles.menuTexto}>📋 Lista</Text>
          </Pressable>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Nuevo Estudiante</Text>
          <Text style={styles.subtitulo}>Completa los datos del formulario</Text>
        </View>

        {/* Sección: Datos personales */}
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>👤 Datos personales</Text>

          <View style={styles.fila}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Campo
                label="Nombre"
                value={form.nombre}
                onChangeText={(val) => update("nombre", val)}
                placeholder="Juan"
                error={errors.nombre}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Campo
                label="Apellido"
                value={form.apellido}
                onChangeText={(val) => update("apellido", val)}
                placeholder="Pérez"
                error={errors.apellido}
              />
            </View>
          </View>

          <View style={styles.fila}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Campo
                label="Edad"
                value={form.edad}
                onChangeText={(val) => update("edad", val)}
                placeholder="20"
                keyboardType="numeric"
                error={errors.edad}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Campo
                label="Semestre"
                value={form.semestre}
                onChangeText={(val) => update("semestre", val)}
                placeholder="3"
                keyboardType="numeric"
                error={errors.semestre}
              />
            </View>
          </View>

          {/* Género */}
          <View style={styles.campoWrapper}>
            <Text style={styles.label}>Género</Text>
            <View style={styles.generoRow}>
              {generos.map((g) => (
                <Pressable
                  key={g}
                  style={[styles.generoBtn, form.genero === g && styles.generoBtnActivo]}
                  onPress={() => update("genero", g)}
                >
                  <Text style={[styles.generoBtnTxt, form.genero === g && styles.generoBtnTxtActivo]}>
                    {g}
                  </Text>
                </Pressable>
              ))}
            </View>
            {errors.genero && <Text style={styles.errorText}>{errors.genero}</Text>}
          </View>
        </View>

        {/* Sección: Contacto */}
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>📬 Contacto</Text>
          <Campo
            label="Correo electrónico"
            value={form.correo}
            onChangeText={(val) => update("correo", val)}
            placeholder="juan@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.correo}
          />
          <Campo
            label="Teléfono"
            value={form.telefono}
            onChangeText={(val) => update("telefono", val)}
            placeholder="3001234567"
            keyboardType="phone-pad"
            error={errors.telefono}
          />
          <Campo
            label="Ciudad"
            value={form.ciudad}
            onChangeText={(val) => update("ciudad", val)}
            placeholder="Pasto"
            error={errors.ciudad}
          />
        </View>

        {/* Sección: Académico */}
        <View style={styles.seccion}>
          <Text style={styles.seccionTitulo}>🎓 Información académica</Text>
          <Campo
            label="Programa"
            value={form.programa}
            onChangeText={(val) => update("programa", val)}
            placeholder="Ingeniería de Sistemas"
            error={errors.programa}
          />
        </View>

        {/* Términos */}
        <View style={styles.terminosRow}>
          <Switch
            value={form.aceptarTerminos}
            onValueChange={(val) => update("aceptarTerminos", val)}
            trackColor={{ false: "#dde1e9", true: "#4f7ef8" }}
            thumbColor="#fff"
          />
          <Text style={styles.terminosTxt}>Acepto los términos y condiciones</Text>
        </View>
        {errors.aceptarTerminos && (
          <Text style={[styles.errorText, { marginLeft: 16, marginTop: -8 }]}>
            {errors.aceptarTerminos}
          </Text>
        )}

        {/* Botones */}
        <View style={styles.botones}>
          <Pressable
            style={({ pressed }) => [styles.btnGuardar, pressed && { opacity: 0.85 }]}
            onPress={handleSubmit}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnGuardarTxt}>Guardar en Supabase</Text>
            )}
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.btnLimpiar, pressed && { opacity: 0.7 }]}
            onPress={resetForm}
            disabled={cargando}
          >
            <Text style={styles.btnLimpiarTxt}>Limpiar formulario</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ── Estilos ────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 8,
  },
  menuBoton: {
    flex: 1,
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  menuTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
  header: {
    marginBottom: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: "#6b7280",
  },
  seccion: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
  },
  seccionTitulo: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  fila: {
    flexDirection: "row",
  },
  campoWrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 15,
    color: "#111827",
  },
  inputError: {
    borderColor: "#ef4444",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
  },
  generoRow: {
    flexDirection: "row",
    gap: 10,
  },
  generoBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#f9fafb",
  },
  generoBtnActivo: {
    borderColor: "#4f7ef8",
    backgroundColor: "#eff4ff",
  },
  generoBtnTxt: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: "500",
  },
  generoBtnTxtActivo: {
    color: "#4f7ef8",
    fontWeight: "700",
  },
  terminosRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    gap: 12,
  },
  terminosTxt: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  botones: {
    marginTop: 8,
    gap: 12,
  },
  btnGuardar: {
    backgroundColor: "#4f7ef8",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#4f7ef8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  btnGuardarTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  btnLimpiar: {
    borderWidth: 1.5,
    borderColor: "#d1d5db",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  btnLimpiarTxt: {
    color: "#6b7280",
    fontSize: 15,
    fontWeight: "600",
  },
});
