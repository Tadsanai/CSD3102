import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for the hamburger menu

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // ตัวอย่างการตรวจสอบชื่อผู้ใช้และรหัสผ่าน
    if (username === "admin" && password === "password") {
      Alert.alert("สำเร็จ", "เข้าสู่ระบบสำเร็จ!");
      navigation.navigate("Wheel");
    } else {
      Alert.alert("ล้มเหลว", "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  const handleMenuPress = () => {
    navigation.navigate("Login"); // Navigate to the login screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
          <Ionicons name="menu" size={30} color="white" />
        </TouchableOpacity>
        <Image
          source={require("../assets/icon.png")} // เพิ่มไอคอนล็อกอิน
          style={styles.icon}
        />
        <Text style={styles.headerText}>เข้าสู่ระบบ</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="ชื่อผู้ใช้"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="รหัสผ่าน"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3b3b3b",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "20px",
  },
  menuButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: 10,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#444",
    color: "white",
    marginBottom: 20,
  },
  loginButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
