import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function SwapButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.swapButton}>
      <Text style={styles.swapButtonText}>สลับตัวเลือก</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  swapButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  swapButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
