import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useGame } from "../context/GameContext";

const Hint = () => {
  const { hint, askHint } = useGame();

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>{hint}</Text>
      <TouchableOpacity style={styles.btn} onPress={askHint}>
        <Text style={styles.btnText}>💡 Pedir pista (-2s)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", marginBottom: 16 },
  hint: { color: "#ffffff", fontSize: 20, fontWeight: "700", letterSpacing: 2, textAlign: "center", marginBottom: 10 },
  btn: { borderWidth: 1, borderColor: "#f8d030", borderRadius: 10, paddingVertical: 8, paddingHorizontal: 16 },
  btnText: { color: "#f8d030", fontWeight: "600", fontSize: 13 },
});

export default Hint;