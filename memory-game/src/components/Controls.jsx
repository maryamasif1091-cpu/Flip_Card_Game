import { useGame } from "../context/GameContext";
const Controls = () => {
  const {
    moves,
    timeLeft,

    timerInput,
    setTimerInput,

    startGame,
    stopGame,
    resetGame,
    applyTimer,

    gameWon,
    gameOver,
    started,
    paused,
  } = useGame();

  return (
    <>
      {/* Stats */}
      <div className="stats">
        <div className="stat-box">
          <span>Moves</span>
          <h3>{moves}</h3>
        </div>

        <div className="stat-box">
          <span>Time Left</span>
          <h3>{timeLeft}s</h3>
        </div>
      </div>

      {/* Controls */}
      <div className="controls">
        <input
          type="number"
          min="10"
          value={timerInput}
          onChange={(e) =>
            setTimerInput(e.target.value)
          }
          placeholder="Timer (sec)"
        />

        <button onClick={applyTimer}>
          Set Timer
        </button>

        <button onClick={startGame}>
          {paused ? "Resume" : "Start"}
        </button>

        <button onClick={stopGame}>
          Stop
        </button>

        <button onClick={resetGame}>
          Reset
        </button>
      </div>

      {/* Game Status */}

      {started && !paused && (
        <div className="message">
          🎮 Game Running...
        </div>
      )}

      {paused && (
        <div className="message">
          ⏸️ Game Paused
        </div>
      )}

      {gameWon && (
        <div className="message success">
          🎉 Congratulations! You win
        </div>
      )}

      {gameOver && (
        <div className="message danger">
          ⏰ Time Over! Good Luck next time.
        </div>
      )}
    </>
  );
};

export default Controls;