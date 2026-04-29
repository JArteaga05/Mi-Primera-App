import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

// ── Tipos ──────────────────────────────────────────────────────────────────
interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  correo: string;
  telefono: string;
  programa: string;
  ciudad: string;
  genero: string;
  semestre: number;
  aceptar_terminos: boolean;
}

// ── Tarjeta de estudiante ──────────────────────────────────────────────────
function TarjetaEstudiante({
  estudiante,
  onPress,
}: {
  estudiante: Estudiante;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.tarjeta, pressed && { opacity: 0.85 }]}
      onPress={onPress}
    >
      {/* Avatar con iniciales */}
      <View style={styles.avatar}>
        <Text style={styles.avatarTxt}>
          {estudiante.nombre[0]}
          {estudiante.apellido[0]}
        </Text>
      </View>

      {/* Info */}
      <View style={styles.tarjetaInfo}>
        <Text style={styles.tarjetaNombre}>
          {estudiante.nombre} {estudiante.apellido}
        </Text>
        <Text style={styles.tarjetaDetalle}>🎓 {estudiante.programa}</Text>
        <Text style={styles.tarjetaDetalle}>
          📍 {estudiante.ciudad} · Semestre {estudiante.semestre}
        </Text>
      </View>

      {/* Flecha */}
      <Text style={styles.flecha}>›</Text>
    </Pressable>
  );
}

// ── Componente principal ───────────────────────────────────────────────────
export default function ListaEstudiantes() {
  const router = useRouter();
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);
  const [error, setError] = useState("");

  const cargarEstudiantes = async () => {
    try {
      const { data, error } = await supabase
        .from("estudiantes")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        setError(error.message);
        return;
      }

      setEstudiantes(data ?? []);
    } catch (e) {
      setError("Error inesperado al cargar");
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  };

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const onRefresh = () => {
    setRefrescando(true);
    cargarEstudiantes();
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      {/* Menú de navegación */}
      <View style={styles.menuContainer}>
        <Pressable
          style={styles.menuBoton}
          onPress={() => router.push("/formulario")}
        >
          <Text style={styles.menuTexto}>📝 Formulario</Text>
        </Pressable>
        <Pressable
          style={[styles.menuBoton, styles.menuBotonActivo]}
          onPress={() => router.push("/lista")}
        >
          <Text style={styles.menuTexto}>📋 Lista</Text>
        </Pressable>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Estudiantes</Text>
        <View style={styles.contadorBadge}>
          <Text style={styles.contadorTxt}>{estudiantes.length}</Text>
        </View>
      </View>

      {/* Contenido */}
      {cargando ? (
        <View style={styles.centrado}>
          <ActivityIndicator size="large" color="#4f7ef8" />
          <Text style={styles.cargandoTxt}>Cargando estudiantes...</Text>
        </View>
      ) : error ? (
        <View style={styles.centrado}>
          <Text style={styles.errorTxt}>⚠️ {error}</Text>
          <Pressable style={styles.btnReintentar} onPress={cargarEstudiantes}>
            <Text style={styles.btnReintentarTxt}>Reintentar</Text>
          </Pressable>
        </View>
      ) : estudiantes.length === 0 ? (
        <View style={styles.centrado}>
          <Text style={styles.vaciaTxt}>😕 No hay estudiantes registrados</Text>
          <Pressable
            style={styles.btnAgregar}
            onPress={() => router.push("/formulario")}
          >
            <Text style={styles.btnAgregarTxt}>＋ Agregar estudiante</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refrescando}
              onRefresh={onRefresh}
              colors={["#4f7ef8"]}
            />
          }
        >
          {estudiantes.map((est) => (
            <TarjetaEstudiante
              key={est.id}
              estudiante={est}
              onPress={() =>
                router.push({
                  pathname: "/detalle",
                  params: {
                    id: String(est.id),
                    nombre: est.nombre,
                    apellido: est.apellido,
                    edad: String(est.edad),
                    correo: est.correo,
                    telefono: est.telefono,
                    programa: est.programa,
                    semestre: String(est.semestre),
                    ciudad: est.ciudad,
                    genero: est.genero,
                  },
                })
              }
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

// ── Estilos ────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
  },
  // Menú
  menuContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  menuBoton: {
    flex: 1,
    backgroundColor: "#111827",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  menuBotonActivo: {
    backgroundColor: "#4f7ef8",
  },
  menuTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
  contadorBadge: {
    backgroundColor: "#4f7ef8",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  contadorTxt: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
  // Lista
  lista: {
    paddingBottom: 30,
    gap: 12,
  },
  // Tarjeta
  tarjeta: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    gap: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#eff4ff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTxt: {
    fontSize: 16,
    fontWeight: "800",
    color: "#4f7ef8",
  },
  tarjetaInfo: {
    flex: 1,
  },
  tarjetaNombre: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 3,
  },
  tarjetaDetalle: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 1,
  },
  flecha: {
    fontSize: 24,
    color: "#9ca3af",
    fontWeight: "300",
  },
  // Estados
  centrado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  cargandoTxt: {
    color: "#6b7280",
    fontSize: 14,
  },
  errorTxt: {
    color: "#ef4444",
    fontSize: 15,
    textAlign: "center",
  },
  vaciaTxt: {
    color: "#6b7280",
    fontSize: 16,
    textAlign: "center",
  },
  btnReintentar: {
    borderWidth: 1.5,
    borderColor: "#4f7ef8",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  btnReintentarTxt: {
    color: "#4f7ef8",
    fontWeight: "700",
  },
  btnAgregar: {
    backgroundColor: "#4f7ef8",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  btnAgregarTxt: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
});
