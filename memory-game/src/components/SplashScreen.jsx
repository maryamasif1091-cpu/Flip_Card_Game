const SplashScreen = ({ enterGame }) => {
  return (
    <div className="splash-screen">
      <div className="splash-card">
        <h1> Memory Match Game</h1>

        <p className="instruction-title">
          Game Instructions
        </p>

        <ul>
          <li>Set your timer before starting.</li>
          <li>Click Start to begin the game.</li>
          <li>Flip two cards at a time.</li>
          <li>Match identical cards to remove them.</li>
          <li>Each pair attempt increases moves.</li>
          <li>Complete all matches before time ends.</li>
          <li>Stop button pauses the game.</li>
          <li>Reset creates a new shuffled board.</li>
        </ul>

        <button
          className="enter-btn"
          onClick={enterGame}
        >
          Enter Game
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;