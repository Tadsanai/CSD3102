import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts, Sarabun_400Regular } from "@expo-google-fonts/sarabun";

import Wheel from "./src/components/Wheel";

export default function App() {
  let [fontsLoaded] = useFonts({
    Sarabun_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Wheel />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});
