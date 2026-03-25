import { useLocalSearchParams, useRouter } from "expo-router";
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
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
    marginTop: 12,
    marginBottom: 4,
  },
  valor: {
    fontSize: 16,
    color: "#1f2937",
    fontWeight: "500",
  },
  estadoBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 4,
  },
  estadoTexto: {
    fontSize: 14,
    fontWeight: "700",
    color: "white",
  },
  botonVolver: {
    backgroundColor: "#111827",
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

export default function DetalleScreen() {
  const router = useRouter();
  const { nombre, ciudad, programa, estado } = useLocalSearchParams(); // ✅ Correcto

  const esDisponible = estado === "Disponible";

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalle del Perfil</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.valor}>{nombre}</Text>

        <Text style={styles.label}>Ciudad</Text>
        <Text style={styles.valor}>{ciudad}</Text>

        <Text style={styles.label}>Programa</Text>
        <Text style={styles.valor}>{programa}</Text>

        <Text style={styles.label}>Estado</Text>
        {/* ✅ Badge con color según el estado */}
        <View
          style={[
            styles.estadoBadge,
            { backgroundColor: esDisponible ? "#16a34a" : "#dc2626" },
          ]}
        >
          <Text style={styles.estadoTexto}>{estado}</Text>
        </View>
      </View>

      <Pressable style={styles.botonVolver} onPress={() => router.back()}>
        <Text style={styles.botonTexto}>Volver</Text>
      </Pressable>
    </View>
  );
}
