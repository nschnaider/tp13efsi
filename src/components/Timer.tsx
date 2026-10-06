import { View, Text, StyleSheet } from "react-native";
import { useGame } from "../context/GameContext";

const Timer = () => {
  const { timeLeft } = useGame();
  const urgente = timeLeft <= 5;

  return (
    <View style={styles.box}>
      <Text style={styles.label}>TIEMPO</Text>
      <Text style={[styles.value, urgente && styles.urgente]}>{timeLeft}s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { flex: 1, backgroundColor: "#141e30", borderRadius: 12, padding: 12, alignItems: "center" },
  label: { color: "#8b949e", fontSize: 11, fontWeight: "700", letterSpacing: 1 },
  value: { color: "#ffffff", fontSize: 26, fontWeight: "800" },
  urgente: { color: "#e74c3c" },
});

export default Timer;