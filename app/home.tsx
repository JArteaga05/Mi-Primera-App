import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const PURPLE = "#6c2eb9";
const PINK = "#c2185b";
const DARK = "#1a0533";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK,
    padding: 20,
    justifyContent: "center",
    overflow: "hidden",
  },
  // Círculo decorativo superior (morado)
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
  // Círculo decorativo inferior (rosado)
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
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "rgba(255,255,255,0.95)",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 2,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.97)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: DARK,
    marginBottom: 8,
  },
  info: {
    fontSize: 15,
    color: "#4b5563",
    marginBottom: 4,
  },
  estado: {
    fontSize: 16,
    fontWeight: "600",
    color: "rgba(255,255,255,0.85)",
    marginBottom: 15,
    textAlign: "center",
  },
  botonPrincipal: {
    backgroundColor: PURPLE,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    elevation: 8,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
  },
  botonSecundario: {
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.5)",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  // Botón para el formulario
  botonFormulario: {
    backgroundColor: PINK,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    elevation: 8,
    shadowColor: PINK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

function TarjetaPerfil({ nombre, ciudad, programa }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{nombre}</Text>
      <Text style={styles.info}>ciudad: {ciudad}</Text>
      <Text style={styles.info}>programa: {programa}</Text>
    </View>
  );
}

export default function InicioScreen() {
  const router = useRouter();
  const [estado, setEstado] = useState("Disponible");

  const cambiarEstado = () => {
    setEstado((prev) =>
      prev === "Disponible" ? "No Disponible" : "Disponible",
    );
  };

  const handleVerDetalle = () => {
    router.push({
      pathname: "/detalle",
      params: {
        nombre: "Andrea Benavides",
        ciudad: "Pasto",
        programa: "Ingeniería de Sistemas",
        estado,
      },
    });
  };

  // Navega a la pantalla del formulario
  const handleAgregarEstudiante = () => {
    router.push("/formulario");
  };

  return (
    <View style={styles.container}>
      {/* Círculos decorativos de fondo */}
      <View style={styles.circuloTop} />
      <View style={styles.circuloBottom} />

      <Text style={styles.titulo}>Perfil Académico</Text>
      <TarjetaPerfil
        nombre="Andrea Benavides"
        ciudad="Pasto"
        programa="Ingeniería de Sistemas"
      />
      <Text style={styles.estado}>Estado actual: {estado}</Text>

      <Pressable style={styles.botonSecundario} onPress={cambiarEstado}>
        <Text style={styles.botonTexto}>Cambiar estado</Text>
      </Pressable>

      <Pressable style={styles.botonPrincipal} onPress={handleVerDetalle}>
        <Text style={styles.botonTexto}>Ver detalle</Text>
      </Pressable>

      {/* Botón nuevo — navega al formulario de estudiantes */}
      <Pressable style={styles.botonFormulario} onPress={handleAgregarEstudiante}>
        <Text style={styles.botonTexto}>＋ Agregar estudiante</Text>
      </Pressable>
    </View>
  );
}