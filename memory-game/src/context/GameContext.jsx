import { createContext, useContext, useEffect, useState } from "react";
const GameContext = createContext();

const icons = [
  "🧨",
  "💻",
  "🌐",
  "🎏",
  "🎨",
  "🗄️",
  "🎇",   
  "🎄",
];

const createCards = () => {
  const duplicated = [...icons, ...icons];

  return duplicated
    .sort(() => Math.random() - 0.5)
    .map((icon, index) => ({
      id: index,
      icon,
      flipped: false,
      matched: false,
    }));
};

export const GameProvider = ({ children }) => {
  const [cards, setCards] = useState(createCards());

  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);

  const [moves, setMoves] = useState(0);

  const [timerInput, setTimerInput] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);

  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    if (gameWon || gameOver) return;

    setStarted(true);
    setPaused(false);
  };

  const stopGame = () => {
    setPaused(true);
  };

  const applyTimer = () => {
    const value = Number(timerInput);

    if (value < 10) {
      alert("Minimum timer is 10 seconds");
      return;
    }
    setTimeLeft(value);
  };

  const resetGame = () => {
    setCards(createCards());

    setFirstCard(null);
    setSecondCard(null);

    setMoves(0);

    setStarted(false);
    setPaused(false);

    setGameWon(false);
    setGameOver(false);

    setTimeLeft(Number(timerInput));
  };

  const handleCardClick = (clickedCard) => {
    if (!started || paused) return;

    if (clickedCard.flipped || clickedCard.matched) return;

    if (secondCard) return;

    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id
        ? { ...card, flipped: true }
        : card
    );

    setCards(updatedCards);

    if (!firstCard) {
      setFirstCard(clickedCard);
    } else {
      setSecondCard(clickedCard);
      setMoves((prev) => prev + 1);
    }
  };

 
  useEffect(() => {
    if (!firstCard || !secondCard) return;
    if (firstCard.icon === secondCard.icon) {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card) =>
            card.icon === firstCard.icon
              ? { ...card, matched: true }
              : card
          )
        );

        setFirstCard(null);
        setSecondCard(null);
      }, 500);
    } else {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstCard.id ||
            card.id === secondCard.id
              ? { ...card, flipped: false }
              : card
          )
        );

        setFirstCard(null);
        setSecondCard(null);
      }, 1000);
    }
  }, [firstCard, secondCard]);

 
  useEffect(() => {
    if (!started || paused || gameWon || gameOver)
      return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameOver(true);
          setStarted(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [started, paused, gameWon, gameOver]);

  // Win Detection
  useEffect(() => {
    const remaining = cards.filter(
      (card) => !card.matched
    );

    if (remaining.length === 0) {
      setGameWon(true);
      setStarted(false);
    }
  }, [cards]);

  return (
    <GameContext.Provider
      value={{
        cards,
        moves,

        timerInput,
        setTimerInput,

        timeLeft,

        started,
        paused,

        gameWon,
        gameOver,

        startGame,
        stopGame,
        resetGame,
        applyTimer,

        handleCardClick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
export const useGame = () => useContext(GameContext);