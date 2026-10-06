import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useGame } from "../context/GameContext";

const GuessForm = () => {
  const { guess, feedback } = useGame();
  // Estado local solo para lo que se está escribiendo (no es dato del juego)
  const [text, setText] = useState("");

  const handleGuess = () => {
    guess(text);
    setText("");
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleGuess}
        placeholder="Escribí el país"
        placeholderTextColor="#4a6080"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="send"
      />
      <TouchableOpacity style={styles.btn} onPress={handleGuess}>
        <Text style={styles.btnText}>Arriesgar</Text>
      </TouchableOpacity>
      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#1a2740",
    color: "#ffffff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 10,
  },
  btn: { backgroundColor: "#e1306c", borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  btnText: { color: "#ffffff", fontWeight: "700", fontSize: 16 },
  feedback: { color: "#e6edf3", textAlign: "center", marginTop: 12, fontSize: 14 },
});

export default GuessForm;