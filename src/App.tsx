import React, { memo, useState, useCallback } from 'react';
import GameArea from '@acm-97/react-snake-game';

import './App.css';

const ButtonStyles = {
  borderRadius: 10,
  fontSize: '2rem',
  padding: '4px 16px',
  animation: 'pulsate 1.5s infinite alternate',
  border: '0.2rem solid #fff',
};

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const startGame = () => {
    setIsRunning(true);
  };

  const stopGame = useCallback((value: number) => {
    setIsGameOver(true);
    setTimeout(() => {
      setScore(value);
      setBestScore((prev) => prev + value);
      setIsRunning(false);
      setIsGameOver(false);
    }, 4000);
  }, [setIsGameOver, setBestScore, setIsRunning]);

  return (
    <div className="game-area-wrapper">
      {isGameOver && (
        <>
          <div className="game-area-overlay">
            <h1 className="gameover-blood" style={{ marginTop: 0, fontSize: '3rem !important' }}>
              GAME OVER
            </h1>
          </div>
        </>
      )}
      {!isRunning && (
        <div className="game-area-overlay">
          <h1>Snake Game</h1>
          <div style={{ display: 'flex', marginBottom: 40, marginTop: 2 }}>
            <h3>BEST SCORE: {bestScore}</h3>
            <h3 style={{ marginLeft: 35 }}>SCORE: {score}</h3>
          </div>
          <button type="button" className="play-button" style={ButtonStyles} onClick={startGame}>
            Play
          </button>
        </div>
      )}
      <GameArea state={{ isRunning, generateObstacles: true }} onGameOver={stopGame} />
    </div>
  );
}

export default memo(App);
