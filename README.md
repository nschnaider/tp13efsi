# TP13 EFSI — Adiviná la Bandera

Juego móvil desarrollado con React Native y Expo donde hay que adivinar a qué país pertenece la bandera que aparece en pantalla.

## Cómo correr el proyecto

```bash
npm install
npx expo login
npx expo start --tunnel
```

El juego se prueba en un celular físico con la app **Expo Go**, iniciando sesión con la misma cuenta de Expo que en la computadora. El proyecto aparece en la pantalla de inicio de Expo Go.

## APIs utilizadas

- **CountriesNow** (`https://countriesnow.space/api/v0.1/countries/flag/images`): lista de países con su código `iso2`.
- **FlagCDN**: las banderas de la API original vienen en SVG, que el componente `Image` de React Native no puede mostrar, así que se usa el código `iso2` para pedir la imagen en PNG (`https://flagcdn.com/w320/{iso2}.png`). También se usa `https://flagcdn.com/es/codes.json` para mostrar los nombres de los países en español.

## Reglas del juego

- Al abrir la app se cargan todos los países y se elige uno al azar.
- Si acertás: sumás **10 puntos** más los segundos que quedaban en el timer, y aparece una nueva bandera.
- Si fallás: restás **1 punto**.
- Si se termina el tiempo: restás 1 punto y pasa a la siguiente bandera.
- No hace falta escribir tildes ni mayúsculas ("japon" cuenta como "Japón").

## Estado global con Context

Todo el estado y la lógica del juego viven en `src/context/GameContext.tsx`:

- `GameContext`, creado con `createContext`.
- `GameProvider`, que envuelve toda la app en `App.tsx` y contiene el estado: países, país actual, puntaje, tiempo restante, letras reveladas y mensajes de resultado.
- `useGame`, un hook que usa `useContext` para que cada componente lea lo que necesita.

Funciones que expone el Context: `guess`, `nextCountry`, `askHint`, `resetScore` y `reload`.

Ningún dato del juego se pasa por props: cada componente consume el Context directamente.

## Componentes

- `Flag` — muestra la bandera actual.
- `GuessForm` — input para escribir el país y botón para arriesgar. Su único estado local es el texto que se está escribiendo.
- `ScoreBoard` — muestra el puntaje.
- `Timer` — cuenta regresiva de 15 segundos (se pone roja en los últimos 5).
- `Hint` — muestra las letras reveladas y el botón para pedir pista.
- `GameScreen` — arma la pantalla, maneja la carga y los errores, y tiene los botones de saltear y reiniciar.

## Plus implementados

- **Timer (15s):** cada bandera tiene 15 segundos; si acertás antes, los segundos restantes se suman al puntaje.
- **Pistas:** cada pista revela una letra al azar del nombre del país y descuenta 2 segundos del timer.

## Estructura

```
src/
├── context/
│   └── GameContext.tsx
├── components/
│   ├── Flag.tsx
│   ├── GuessForm.tsx
│   ├── Hint.tsx
│   ├── ScoreBoard.tsx
│   └── Timer.tsx
└── screens/
    └── GameScreen.tsx
```