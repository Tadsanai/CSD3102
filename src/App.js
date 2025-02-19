import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Wheel from "./components/Wheel";
import Login from "./components/Login";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} // ซ่อน header ของหน้าล็อกอิน
        />
        <Stack.Screen name="Wheel" component={Wheel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
