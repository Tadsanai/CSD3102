import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import Svg, { G, Path, Circle, Text as SvgText } from "react-native-svg";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  runOnJS,
  withRepeat,
  withTiming,
  cancelAnimation,
} from "react-native-reanimated";
import { getWheelPaths } from "./utils";
import SwapButton from "./SwapButton"; // Import SwapButton

const { width } = Dimensions.get("window");
const WHEEL_SIZE = width * 0.8;

const defaultSegments = ["A", "B", "C", "D", "E", "F"];
const colors = [
  "#ff0000",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#FFBD33",
  "#8D33FF",
];

export default function Wheel() {
  const rotation = useSharedValue(0);
  const [segments, setSegments] = useState(defaultSegments);
  const [inputText, setInputText] = useState("");
  const [history, setHistory] = useState([]); // State to store history

  useEffect(() => {
    // เริ่มการหมุนแบบพรีวิวเมื่อคอมโพเนนต์ถูกเรนเดอร์ครั้งแรก
    rotation.value = withRepeat(withTiming(360, { duration: 5000 }), -1);
  }, []);

  const completeSpinning = (selectedIndex) => {
    const result = segments[selectedIndex];
    setHistory([...history, result]); // Update history
    Alert.alert(
      "ผลลัพธ์",
      result,
      [
        { text: "ปิด", style: "cancel" },
        {
          text: "ลบตัวเลือกนี้",
          onPress: () => handleRemoveSegment(selectedIndex),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleSpin = () => {
    // หยุดการหมุนแบบพรีวิว
    cancelAnimation(rotation);

    const randomTurns = Math.floor(Math.random() * 5) + 3;
    const randomOffset = Math.random() * 360;
    rotation.value = withSpring(
      rotation.value + randomTurns * 360 + randomOffset,
      {
        damping: 20,
        stiffness: 90,
      },
      (finished) => {
        if (finished) {
          const normalizedRotation = (rotation.value + 180) % 360; // เพิ่ม 180 องศา
          const segmentSize = 360 / segments.length;
          const selectedIndex = Math.floor(
            ((360 - normalizedRotation) % 360) / segmentSize
          );

          // Use runOnJS to call our function on the UI thread
          runOnJS(completeSpinning)(selectedIndex);
        }
      }
    );
  };

  const handleAddSegment = () => {
    if (inputText.trim() !== "") {
      setSegments([...segments, inputText.trim()]);
      setInputText("");
    }
  };

  const handleRemoveSegment = (index) => {
    if (segments.length > 2) {
      const newSegments = segments.filter((_, i) => i !== index);
      setSegments(newSegments);
    } else {
      alert("❌ ต้องมีอย่างน้อย 2 ตัวเลือก!");
    }
  };

  const handleSwapSegments = () => {
    const swappedSegments = [...segments].reverse();
    setSegments(swappedSegments);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      {/* แถบชื่อแอพ */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Decision Wheel</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.wheelWrapper}>
          <Animated.View style={[styles.wheelContainer, animatedStyle]}>
            <Svg
              width={WHEEL_SIZE}
              height={WHEEL_SIZE}
              viewBox="-150 -150 300 300"
            >
              <G x={0} y={0}>
                {getWheelPaths(segments.length, colors).map(
                  ({ path, color }, index) => (
                    <Path
                      key={index}
                      d={path}
                      fill={color}
                      stroke="black"
                      strokeWidth="1"
                    />
                  )
                )}
                {segments.map((label, index) => {
                  const textAngle =
                    index * (360 / segments.length) + 180 / segments.length;
                  const x = 100 * Math.cos((textAngle - 90) * (Math.PI / 180));
                  const y = 100 * Math.sin((textAngle - 90) * (Math.PI / 180));

                  return (
                    <SvgText
                      key={index}
                      fill="white"
                      fontSize={segments.length > 8 ? "10" : "16"}
                      fontWeight="bold"
                      x={x}
                      y={y}
                      textAnchor="middle"
                      transform={`rotate(${textAngle} ${x} ${y})`}
                    >
                      {label}
                    </SvgText>
                  );
                })}
              </G>

              {/* ปุ่มหมุนเป็นจุดสีดำตรงกลางวงล้อ */}
              <Circle cx="0" cy="0" r="15" fill="white" />
            </Svg>

            {/* ปุ่มหมุนเป็นจุดสีดำตรงกลางวงล้อ */}
            <TouchableOpacity onPress={handleSpin} style={styles.spinButton}>
              <Circle cx="0" cy="0" r="15" fill="white" />
            </TouchableOpacity>
          </Animated.View>

          {/* ตัวชี้ตำแหน่งที่หยุด (สามเหลี่ยม) - ย้ายไปทางขวานอกวงล้อ */}
          <Svg
            style={styles.pointer}
            width="30"
            height="30"
            viewBox="0 0 30 30"
          >
            <Path d="M 15 0 L 30 30 L 0 30 Z" fill="black" />
          </Svg>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="เพิ่มตัวเลือกในวงล้อ"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity onPress={handleAddSegment} style={styles.addButton}>
            <Text style={styles.addButtonText}>เพิ่ม</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          {segments.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.listText}>{item}</Text>
              <TouchableOpacity
                onPress={() => handleRemoveSegment(index)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>🗑</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <SwapButton onPress={handleSwapSegments} /> {/* Add SwapButton */}
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>ประวัติผลลัพธ์:</Text>
          {history.map((item, index) => (
            <Text key={index} style={styles.historyText}>
              {item}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#3b3b3b", // สีพื้นหลังเข้มขึ้น
  },
  header: {
    width: "100%",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#222",
    alignItems: "center",
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  headerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingTop: 80, // เพิ่ม padding เพื่อไม่ให้เนื้อหาถูกบังโดย header
  },
  wheelWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  wheelContainer: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333", // สีเข้ม
    borderRadius: WHEEL_SIZE / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#222", // ขอบเข้ม
  },
  spinButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -15 }, { translateY: -15 }],
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "white", // เปลี่ยนสีปุ่มเป็นสีขาว
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // เพิ่มเงา
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  pointer: {
    position: "absolute",
    top: "97%",
    left: WHEEL_SIZE / 2 - 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#222",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#555",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#444",
    color: "white",
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  addButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  listContainer: {
    marginTop: 20,
    width: "80%",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#444",
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#666",
  },
  listText: { fontSize: 16, fontWeight: "bold", color: "white" },
  removeButton: {
    backgroundColor: "#dc3545",
    padding: 8,
    borderRadius: 5,
  },
  removeButtonText: { color: "white", fontSize: 16 },
  historyContainer: {
    marginTop: 20,
    width: "80%",
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#555",
  },
  historyTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  historyText: {
    color: "white",
    fontSize: 14,
    marginBottom: 5,
  },
});
