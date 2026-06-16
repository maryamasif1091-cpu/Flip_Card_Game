import { useGame } from "../context/GameContext";
import Card from "./Card";

const GameBoard = () => {
  const { cards } = useGame();

  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
        />
      ))}
    </div>
  );
};

export default GameBoard;