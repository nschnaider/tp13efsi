import { View, Image, StyleSheet } from "react-native";
import { useGame } from "../context/GameContext";

const Flag = () => {
  const { current } = useGame();
  if (!current) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: current.flagUrl }} style={styles.flag} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141e30",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 16,
  },
  flag: { width: "100%", aspectRatio: 3 / 2 },
});

export default Flag;