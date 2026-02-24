import { Image } from "expo-image";
import { StyleSheet } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Hola, Bienvenido A Mi Primera Aplicación
        </ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.descriptionContainer}>
        <ThemedText style={styles.description}>
          Algo nuevo está llegando. Esta app será tu espacio para descubrir
          funciones innovadoras y una experiencia diferente. 🚀
        </ThemedText>
        <ThemedView style={styles.badge}>
          <ThemedText style={styles.badgeText}>
            ✦ Próximamente más novedades
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  descriptionContainer: {
    marginTop: 8,
    gap: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.7,
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#e8f7fb",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#1D3D47",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
