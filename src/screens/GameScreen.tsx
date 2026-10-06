import {
  View, Text, TouchableOpacity, ActivityIndicator, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGame } from "../context/GameContext";
import Flag from "../components/Flag";
import ScoreBoard from "../components/ScoreBoard";
import Timer from "../components/Timer";
import Hint from "../components/Hint";
import GuessForm from "../components/GuessForm";

const GameScreen = () => {
  const { loading, error, reload, nextCountry, resetScore } = useGame();

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#e1306c" />
        <Text style={styles.muted}>Cargando países...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity onPress={reload}>
          <Text style={styles.retry}>Reintentar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>🌍 Adiviná la bandera</Text>

          <View style={styles.statsRow}>
            <ScoreBoard />
            <Timer />
          </View>

          <Flag />
          <Hint />
          <GuessForm />

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.secondaryBtn} onPress={nextCountry}>
              <Text style={styles.secondaryText}>⏭️ Saltear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryBtn} onPress={resetScore}>
              <Text style={styles.secondaryText}>🔄 Reiniciar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a1628" },
  content: { padding: 20, paddingBottom: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0a1628", gap: 12 },
  title: { color: "#ffffff", fontSize: 24, fontWeight: "800", textAlign: "center", marginBottom: 16 },
  statsRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  actionsRow: { flexDirection: "row", gap: 12, marginTop: 16 },
  secondaryBtn: {
    flex: 1, borderWidth: 1, borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 10, paddingVertical: 11, alignItems: "center",
  },
  secondaryText: { color: "#e6edf3", fontWeight: "600", fontSize: 14 },
  muted: { color: "#8b949e", fontSize: 14 },
  error: { color: "#e74c3c", fontSize: 14 },
  retry: { color: "#e1306c", fontWeight: "700" },
});

export default GameScreen;