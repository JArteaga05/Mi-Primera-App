import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ title: "Inicio" }} />
      <Stack.Screen name="formulario" options={{ title: "Formulario" }} />
      <Stack.Screen name="lista" options={{ title: "Lista" }} />
      <Stack.Screen name="detalle" options={{ title: "Detalle" }} />
      <Stack.Screen name="home" options={{ title: "Inicio" }} />
    </Stack>
  );
}
