import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native"; //botonesmodernos, texto,contenedores, controles y estilos

//componente
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export default function App() {
  //estado: lo que cambia en pantalla
  const [estado, setEstado] = useState("Disponible"); //constantes
  const [toques, setToques] = useState(0); //constantes

  //funcion: lo que pasa la tocar el boton
  const toggleEstado = () => {
    setToques((t) => t + 1);
    setEstado((prev) => (prev === "Disponible" ? "En clases" : "Disponible"));
  };

  return (
    //contenedor
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Perfil 6E</Text>
        <Text style={styles.subtitle}>Desarrollo Móvil • React Native</Text>
      </View>

      {/* TARJETA */}
      <View style={styles.card}>
        {/* Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>6E</Text>
        </View>

        <Text style={styles.name}>Estudiante</Text>
        <Text style={styles.program}>Ingeniería de Sistemas</Text>

        <View style={styles.divider} />

        <InfoRow label="Semestre" value="2026-A" />
        <InfoRow label="Grupo" value="6E" />
        <InfoRow label="Estado" value={estado} />
        <InfoRow label="Toques" value={String(toques)} />

        {/* BOTÓN */}
        <Pressable
          onPress={toggleEstado}
          style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
        >
          <Text style={styles.btnText}>Cambiar estado</Text>
        </Pressable>

        {/* Mensaje dinámico */}
        <Text style={styles.tip}>
          Tip: cada toque cambia el estado y suma un contador.
        </Text>
      </View>
    </View>
  );
}

const COLORS = {
  bg: "#0B1220",
  card: "#121B2E",
  primary: "#5B8CFF",
  text: "#EAF0FF",
  muted: "#AAB7D6",
  line: "rgba(234,240,255,0.12)",
  success: "#29D3A6",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    padding: 18,
    justifyContent: "center",
  },
  header: {
    marginBottom: 16,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: 4,
    color: COLORS.muted,
    fontSize: 14,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.line,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(91,140,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(91,140,255,0.35)",
    marginBottom: 10,
  },
  avatarText: {
    color: COLORS.text,
    fontWeight: "900",
    fontSize: 18,
  },
  name: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "800",
  },
  program: {
    color: COLORS.muted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.line,
    marginVertical: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  rowLabel: {
    color: COLORS.muted,
    fontSize: 14,
  },
  rowValue: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "700",
  },
  btn: {
    marginTop: 14,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  btnPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },
  btnText: {
    color: "#0B1220",
    fontWeight: "900",
    fontSize: 15,
  },
  tip: {
    marginTop: 10,
    color: COLORS.muted,
    fontSize: 12,
  },
});
