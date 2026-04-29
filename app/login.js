import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { supabase } from "../lib/supabase";

const { width } = Dimensions.get("window");

const PURPLE = "#6c2eb9";
const PINK = "#c2185b";
const DARK = "#1a0533";

export default function LoginScreen() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const validarCorreo = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    setError("");

    if (!correo.trim()) {
      setError("El correo es requerido");
      return;
    }
    if (!validarCorreo(correo)) {
      setError("Ingresa un correo válido");
      return;
    }
    if (!password) {
      setError("La contraseña es requerida");
      return;
    }

    try {
      setCargando(true);

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: correo,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      // Login exitoso — navegar a la pantalla principal
      router.replace("/index");
    } catch (e) {
      setError("Error inesperado. Intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.root}>

        {/* Círculos decorativos de fondo */}
        <View style={styles.circuloTop} />
        <View style={styles.circuloBottom} />

        {/* Avatar / Logo */}
        <View style={styles.logoArea}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>🎓</Text>
          </View>
          <Text style={styles.appNombre}>CESMAG APP</Text>
          <Text style={styles.appSubtitulo}>Sistema de Estudiantes</Text>
        </View>

        {/* Card del formulario */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Iniciar Sesión</Text>
          <Text style={styles.cardSubtitulo}>Ingresa tus credenciales</Text>

          {/* Campo correo */}
          <View style={styles.campoWrapper}>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={[styles.input, error && !correo && styles.inputError]}
              placeholder="correo@dominio.com"
              placeholderTextColor="#aab0bc"
              value={correo}
              onChangeText={(val) => { setCorreo(val); setError(""); }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Campo contraseña */}
          <View style={styles.campoWrapper}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, styles.inputPassword, error && !password && styles.inputError]}
                placeholder="••••••••"
                placeholderTextColor="#aab0bc"
                value={password}
                onChangeText={(val) => { setPassword(val); setError(""); }}
                secureTextEntry={!verPassword}
                autoCapitalize="none"
              />
              <Pressable
                style={styles.ojito}
                onPress={() => setVerPassword((v) => !v)}
              >
                <Text style={styles.ojitoTxt}>{verPassword ? "🙈" : "👁️"}</Text>
              </Pressable>
            </View>
          </View>

          {/* Error general */}
          {error ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorTxt}>⚠️ {error}</Text>
            </View>
          ) : null}

          {/* Botón login */}
          <Pressable
            style={({ pressed }) => [styles.btnLogin, pressed && { opacity: 0.85 }]}
            onPress={handleLogin}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnLoginTxt}>Ingresar</Text>
            )}
          </Pressable>

          {/* Separador */}
          <View style={styles.separador}>
            <View style={styles.linea} />
            <Text style={styles.separadorTxt}>o</Text>
            <View style={styles.linea} />
          </View>

          {/* Ir al registro */}
          <Pressable
            style={({ pressed }) => [styles.btnRegistro, pressed && { opacity: 0.7 }]}
            onPress={() => router.push("/formulario")}
          >
            <Text style={styles.btnRegistroTxt}>Registrar nuevo estudiante</Text>
          </Pressable>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: DARK,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    overflow: "hidden",
  },

  // Círculos de fondo
  circuloTop: {
    position: "absolute",
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: width,
    backgroundColor: PURPLE,
    top: -width * 0.55,
    left: -width * 0.05,
    opacity: 0.55,
  },
  circuloBottom: {
    position: "absolute",
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: width,
    backgroundColor: PINK,
    bottom: -width * 0.5,
    right: -width * 0.2,
    opacity: 0.35,
  },

  // Logo
  logoArea: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarEmoji: {
    fontSize: 36,
  },
  appNombre: {
    fontSize: 14,
    fontWeight: "800",
    color: "rgba(255,255,255,0.95)",
    letterSpacing: 4,
  },
  appSubtitulo: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginTop: 4,
    letterSpacing: 1,
  },

  // Card
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.97)",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 20,
  },
  cardTitulo: {
    fontSize: 22,
    fontWeight: "800",
    color: DARK,
    marginBottom: 4,
    textAlign: "center",
  },
  cardSubtitulo: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },

  // Campos
  campoWrapper: {
    marginBottom: 16,
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
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    color: "#111827",
  },
  inputError: {
    borderColor: "#ef4444",
    backgroundColor: "#fff5f5",
  },
  passwordRow: {
    position: "relative",
  },
  inputPassword: {
    paddingRight: 48,
  },
  ojito: {
    position: "absolute",
    right: 14,
    top: 13,
  },
  ojitoTxt: {
    fontSize: 18,
  },

  // Error
  errorBox: {
    backgroundColor: "#fff5f5",
    borderWidth: 1,
    borderColor: "#fca5a5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  errorTxt: {
    color: "#ef4444",
    fontSize: 13,
    fontWeight: "500",
  },

  // Botón login
  btnLogin: {
    backgroundColor: PURPLE,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    elevation: 6,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  btnLoginTxt: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  // Separador
  separador: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    gap: 10,
  },
  linea: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb",
  },
  separadorTxt: {
    color: "#9ca3af",
    fontSize: 13,
  },

  // Botón registro
  btnRegistro: {
    borderWidth: 2,
    borderColor: PINK,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  btnRegistroTxt: {
    color: PINK,
    fontSize: 15,
    fontWeight: "700",
  },
});