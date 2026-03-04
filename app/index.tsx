import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

// Separador visual
function Divider() {
  return <View style={styles.divisor} />;
}

//  Título de sección
function Seccion({ icono, titulo }) {
  return (
    <View style={styles.seccionHeader}>
      <Text style={styles.seccionIcono}>{icono}</Text>
      <Text style={styles.seccionTitulo}>{titulo}</Text>
    </View>
  );
}

// Badge / Chip
function Badge({ texto }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{texto}</Text>
    </View>
  );
}

// Botón reutilizable
function Boton({ texto, onPress }) {
  return (
    <Pressable style={styles.boton} onPress={onPress}>
      <Text style={styles.botonTexto}>{texto}</Text>
    </Pressable>
  );
}

// Campo de formulario
function Campo({ label, placeholder, teclado = "default" }) {
  return (
    <View style={styles.campo}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        keyboardType={teclado}
        placeholderTextColor="#8a8a8a"
        style={styles.input}
      />
    </View>
  );
}

// Tarjeta informativa
function Tarjeta({ icono, titulo, descripcion }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardIcon}>{icono}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{titulo}</Text>
        <Text style={styles.cardText}>{descripcion}</Text>
      </View>
    </View>
  );
}

// Mini tarjeta (solo UI)
function MiniCard({ icono, titulo, valor }) {
  return (
    <View style={styles.miniCard}>
      <Text style={styles.miniIcon}>{icono}</Text>
      <Text style={styles.miniTitle}>{titulo}</Text>
      <Text style={styles.miniValue}>{valor}</Text>
    </View>
  );
}

// Fila de resumen
function Estadistica({ label, value }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

export default function App() {
  // ÚNICA funcionalidad permitida en este laboratorio
  const [estado, setEstado] = useState("Disponible");

  const cambiarEstado = () => {
    setEstado((prev) => (prev === "Disponible" ? "En clase 👩‍💻" : "Disponible"));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER PERFIL */}
      <View style={styles.header}>
        <Image
          source={require("../assets/images/information-technology-cyber-vision-systems-osb7da4h47w8pnbn.jpg")}
          style={styles.foto}
        />

        <View style={styles.headerInfo}>
          <Text style={styles.nombre}>Nombre Apellido</Text>
          <Text style={styles.subtitulo}>Estudiante • React Native</Text>

          <View style={styles.estadoRow}>
            <Text style={styles.estadoLabel}>Estado:</Text>
            <Text style={styles.estado}>{estado}</Text>
          </View>

          <Boton texto="Cambiar estado" onPress={cambiarEstado} />
        </View>
      </View>

      {/* BADGES */}
      <View style={styles.badgesContainer}>
        <Badge texto="UI/UX" />
        <Badge texto="Expo" />
        <Badge texto="Componentes" />
        <Badge texto="Mobile" />
        <Badge texto="Diseño" />
        <Badge texto="Estilos" />
      </View>

      <Divider />

      {/* FORMULARIO */}
      <Seccion icono="📄" titulo="Datos del Perfil" />

      <Campo label="Nombre" placeholder="Ej: Andrea" />
      <Campo label="Apellido" placeholder="Ej: Benavides" />
      <Campo
        label="Correo"
        placeholder="Ej: correo@dominio.com"
        teclado="email-address"
      />
      <Campo label="Ciudad" placeholder="Ej: Pasto" />
      <Campo
        label="Teléfono"
        placeholder="Ej: 3001234567"
        teclado="phone-pad"
      />
      <Campo label="Ocupación" placeholder="Ej: Estudiante / Desarrollador" />

      <Divider />

      {/* COMPONENTES EXTRA (UI) */}
      <Seccion icono="🧩" titulo="Resumen Visual" />

      <View style={styles.miniGrid}>
        <MiniCard icono="📚" titulo="Curso" valor="Móvil" />
        <MiniCard icono="⏳" titulo="Corte" valor="1" />
        <MiniCard icono="✅" titulo="Avance" valor="UI" />
      </View>

      <View style={styles.statsBox}>
        <Text style={styles.statsTitle}>Resumen rápido</Text>
        <Estadistica label="Componentes usados" value="8+" />
        <Estadistica label="Pantallas" value="1" />
        <Estadistica label="Navegación" value="No" />
      </View>

      <Divider />

      {/* TARJETAS */}
      <Seccion icono="📌" titulo="Tarjetas Informativas" />

      <Tarjeta
        icono="⚙️"
        titulo="Habilidad principal"
        descripcion="Diseño de interfaces móviles limpias y organizadas."
      />
      <Tarjeta
        icono="📱"
        titulo="Proyecto actual"
        descripcion="App tipo perfil usando componentes reutilizables."
      />
      <Tarjeta
        icono="🚀"
        titulo="Meta del curso"
        descripcion="Aprender navegación, listas, formularios y consumo de API."
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ✅ Entrega: captura del emulador + link del repositorio (si aplica).
        </Text>
        <Text style={styles.footerWarn}>
          📌 Base directa del parcial del próximo lunes.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    backgroundColor: "#f4f5f7",
  },

  header: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    gap: 12,
    elevation: 3,
  },

  foto: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  headerInfo: {
    flex: 1,
    justifyContent: "center",
  },

  nombre: {
    fontSize: 20,
    fontWeight: "bold",
  },

  subtitulo: {
    color: "gray",
    marginBottom: 6,
  },

  estadoRow: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    marginBottom: 10,
  },

  estadoLabel: {
    fontWeight: "bold",
  },

  estado: {
    color: "#6b7280",
  },

  boton: {
    backgroundColor: "#111827",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  botonTexto: {
    color: "white",
    fontWeight: "bold",
  },

  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },

  badge: {
    backgroundColor: "white",
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 999,
    elevation: 2,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },

  divisor: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 16,
  },

  seccionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },

  seccionIcono: {
    fontSize: 16,
  },

  seccionTitulo: {
    fontSize: 16,
    fontWeight: "bold",
  },

  campo: {
    marginBottom: 12,
  },

  label: {
    marginBottom: 6,
    fontWeight: "600",
    color: "#111827",
  },

  input: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    elevation: 2,
  },

  miniGrid: {
    flexDirection: "row",
    gap: 10,
  },

  miniCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 12,
    borderRadius: 14,
    elevation: 2,
    alignItems: "center",
  },

  miniIcon: {
    fontSize: 18,
    marginBottom: 6,
  },

  miniTitle: {
    fontSize: 12,
    color: "gray",
  },

  miniValue: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
  },

  statsBox: {
    marginTop: 12,
    backgroundColor: "white",
    borderRadius: 14,
    padding: 12,
    elevation: 2,
  },

  statsTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },

  statLabel: {
    color: "#111827",
    fontWeight: "600",
  },

  statValue: {
    color: "gray",
  },

  card: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "white",
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    elevation: 3,
    alignItems: "center",
  },

  cardIcon: {
    fontSize: 22,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },

  cardText: {
    color: "gray",
    marginTop: 2,
  },

  footer: {
    marginTop: 18,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 14,
    elevation: 2,
  },

  footerText: {
    color: "#111827",
    fontSize: 13,
  },

  footerWarn: {
    marginTop: 6,
    color: "#6b7280",
    fontSize: 12,
  },
});
