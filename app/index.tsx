import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Stack = createNativeStackNavigator();
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

//componente reutikizable para mostrar la tarjeta de perfil
function TarjetaPerfil(props) {
  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{props.nombre}</Text>
      <Text style={styles.info}>ciudad: {props.ciudad}</Text>
      <Text style={styles.info}>programa: {props.programa}</Text>
    </View>
  );
}

//pantalla de inicio donde se muestra la tarjeta de perfil y el estado actual, ademas de los botones para cambiar el estado y ver el detalle
function inicioScreen({ navigation }) {
  const [estado, setEstado] = useState("Disponible");
  const cambiarEstado = () => {
    setEstado((prev) =>
      prev === "Disponible" ? "No Disponible" : "Disponible",
    );
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

      <Pressable
        style={styles.botonPrincipal}
        onPress={() =>
          navigation.navigate("Detalle", {
            nombre: "Andrea Benavides",
            ciudad: "Pasto",
            programa: "Ingeniería de Sistemas",
            estado: estado,
          })
        }
      >
        <Text style={styles.botonTexto}>Ver detalle</Text>
      </Pressable>
    </View>
  );
}
//pantalla 2 donde se muestra el detalle del perfil academico, ademas del estado actual
function detalleScreen({ route, navigation }) {
  const { nombre, ciudad, programa, estado } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.nombre}>{nombre}</Text>
    </View>
  );
}
