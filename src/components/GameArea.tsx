import React, { useEffect } from 'react';

import { gameAreaStyles } from '../styles/gameArea';
import { useSnake } from '../hooks';
import { Food, Snake } from '.';

export type AppProps = {
  speed?: number;
  canMove?: boolean;
  direction?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  snakeDots?: number[][];
  onGameOver?: () => void;
  onEatFood?: () => void;
};

const GameArea = ({
  speed: _speed,
  canMove: _canMove,
  direction: _direction,
  snakeDots: _snakeDots,
  onGameOver: _onGameOver,
  onEatFood: _onEatFood,
}: AppProps) => {
  const { canMove, snakeDots, food, onKeyDown, checkIfOutOfBorders, checkIfCollapsed, checkIfEat, moveSnake } =
    useSnake({ _speed, _canMove, _direction, _snakeDots, _onGameOver, _onEatFood });

  useEffect(() => {
    let interval: any = null;
    if (canMove) {
      checkIfOutOfBorders();
      checkIfCollapsed();
      checkIfEat();
      interval = setInterval(() => moveSnake(), 200);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snakeDots, canMove]);

  useEffect(() => {
    // document.onkeydown = onKeyDown;
    document.addEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={gameAreaStyles} className="game-area">
      <Snake snakeDots={snakeDots} />
      <Food dot={food} />
    </div>
  );
};

export default GameArea;
