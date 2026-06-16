import { useState } from "react";
import "./App.css";

import SplashScreen from "./components/SplashScreen";
import Controls from "./components/Controls";
import GameBoard from "./components/GameBoard";

import { GameProvider } from "./context/GameContext";

function GameScreen() {
  return (
    <div className="game-container">
      <h1 className="game-title"> Memory Match Game</h1>

      <Controls />
      <GameBoard />

    </div>
  );
}

function App() {
  const [showGame, setShowGame] = useState(false);
  return (
    <GameProvider>
      <div className="app">
        {showGame ? (
          <GameScreen />
        ) : (
          <SplashScreen enterGame={() => setShowGame(true)} />
        )}
      </div>
    </GameProvider>
  );
}
export default App;