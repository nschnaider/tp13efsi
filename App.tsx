import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GameProvider } from "./src/context/GameContext";
import GameScreen from "./src/screens/GameScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* GameProvider envuelve toda la app: el estado del juego vive acá */}
      <GameProvider>
        <StatusBar style="light" />
        <GameScreen />
      </GameProvider>
    </SafeAreaProvider>
  );
}