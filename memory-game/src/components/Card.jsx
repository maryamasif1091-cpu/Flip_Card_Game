import { useGame } from "../context/GameContext";
const Card = ({ card }) => {
  const { handleCardClick, started, paused } = useGame();
  // Matched cards disappear
  if (card.matched) {
    return <div className="matched-card"></div>;
  }
  return (
    <div
      className={`card ${card.flipped ? "flipped" : ""}`}
      onClick={() => {
        if (!started || paused) return;
        handleCardClick(card);
      }}
    >
      <div className="card-inner">
        {}
        <div className="card-front">?</div>
        {}
        <div className="card-back">
          {card.icon}
        </div>
      </div>
    </div>
  );
};
export default Card;