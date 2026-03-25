import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    elevation: 4,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
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
    color: "#1f2937",
    marginBottom: 15,
    textAlign: "center",
  },
  botonPrincipal: {
    backgroundColor: "#111827",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  botonSecundario: {
    backgroundColor: "#6b7280",
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
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

  return (
    <View style={styles.container}>
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
    </View>
  );
}
