import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Country {
  name: string;
  flagUrl: string;
}

// Todo lo que el juego comparte con los componentes
interface GameContextType {
  loading: boolean;
  error: string | null;
  current: Country | null;
  score: number;
  timeLeft: number;
  hint: string;
  feedback: string;
  guess: (text: string) => void;
  nextCountry: () => void;
  askHint: () => void;
  resetScore: () => void;
  reload: () => void;
}

const TIEMPO = 15;

const GameContext = createContext<GameContextType | undefined>(undefined);

// Compara sin importar mayúsculas, espacios ni tildes
const normalizar = (t: string) =>
  t.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [current, setCurrent] = useState<Country | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIEMPO);
  const [revealed, setRevealed] = useState<number[]>([]); // letras reveladas por pistas
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Elige un país al azar y reinicia timer y pistas
  const pickRandom = (list: Country[] = countries) => {
    const random = list[Math.floor(Math.random() * list.length)];
    setCurrent(random);
    setTimeLeft(TIEMPO);
    setRevealed([]);
  };

    const loadCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://countriesnow.space/api/v0.1/countries/flag/images");
      const json = await res.json();

      // Nombres en español por código de país (ej: { "jp": "Japón" })
      // Si falla, seguimos con los nombres en inglés de la API
      let nombresEs: Record<string, string> = {};
      try {
        const resEs = await fetch("https://flagcdn.com/es/codes.json");
        nombresEs = await resEs.json();
      } catch {}

      const list: Country[] = json.data
        .filter((c: any) => c.iso2)
        .map((c: any) => ({
          name: nombresEs[c.iso2.toLowerCase()] ?? c.name,
          flagUrl: `https://flagcdn.com/w320/${c.iso2.toLowerCase()}.png`,
        }));
      setCountries(list);
      pickRandom(list);
    } catch {
      setError("No se pudieron cargar los países.");
    } finally {
      setLoading(false);
    }
  };

  // Al montar la app traemos todos los países
  useEffect(() => {
    loadCountries();
  }, []);

  // Timer: baja 1 segundo por vez; si llega a 0 cuenta como fallo y pasa al siguiente
  useEffect(() => {
    if (!current) return;
    if (timeLeft <= 0) {
      setScore((s) => s - 1);
      setFeedback(`⏰ Se acabó el tiempo. Era ${current.name} (-1)`);
      pickRandom();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, current]);

  const guess = (text: string) => {
    if (!current || !text.trim()) return;
    if (normalizar(text) === normalizar(current.name)) {
      // Acierto: +10 y los segundos que quedaban (plus del timer)
      const puntos = 10 + timeLeft;
      setScore((s) => s + puntos);
      setFeedback(`✅ ¡Correcto! Era ${current.name} (+${puntos})`);
      pickRandom();
    } else {
      setScore((s) => s - 1);
      setFeedback("❌ Incorrecto (-1)");
    }
  };

  const nextCountry = () => {
    if (current) setFeedback(`⏭️ Salteaste. Era ${current.name}`);
    pickRandom();
  };

  // Pista: revela una letra al azar y descuenta 2 segundos
  const askHint = () => {
    if (!current) return;
    const pendientes = current.name
      .split("")
      .map((_, i) => i)
      .filter((i) => current.name[i] !== " " && !revealed.includes(i));
    if (pendientes.length === 0) return;
    const i = pendientes[Math.floor(Math.random() * pendientes.length)];
    setRevealed((prev) => [...prev, i]);
    setTimeLeft((t) => Math.max(0, t - 2));
  };

  const resetScore = () => {
    setScore(0);
    setFeedback("");
    pickRandom();
  };

  // Arma el texto de la pista: "_ _ r _ _ _ y"
  const hint = current
    ? current.name
        .split("")
        .map((ch, i) => (ch === " " ? " " : revealed.includes(i) ? ch : "_"))
        .join(" ")
    : "";

  return (
    <GameContext.Provider
      value={{
        loading, error, current, score, timeLeft, hint, feedback,
        guess, nextCountry, askHint, resetScore, reload: loadCountries,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// Hook para consumir el Context desde cualquier componente
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame debe usarse dentro de GameProvider");
  return context;
};