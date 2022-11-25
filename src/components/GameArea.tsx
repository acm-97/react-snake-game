import React, { useEffect } from 'react';

import Snake from './Snake';
import Obstacle from './Obstacles';
import Food from './Food';
import { getRandomCoordinates } from '../utils';
import { gameAreaStyles } from '../styles/gameArea';
import { useGameArea } from '../hooks';

export type UserStylesProps = {
  gameArea?: object;
  snake?: object;
  food?: object;
  obstacles?: object;
};

export type StateProps = {
  foodCoordinates?: [number, number];
  snakeCoordinates?: [number, number][];
  direction?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  speed?: number;
  isRunning?: boolean;
  numObstacles?: number;
  generateObstacles?: boolean;
};

export type GameAreaProps = {
  onGameOver?: (points: number) => void;
  onEatFood?: (snakePosition: number[], foodPosition: number[]) => void;
  styles?: UserStylesProps;
  state?: StateProps;
};

const GameArea = ({ state, styles: userStyles, onGameOver: _onGameOver, onEatFood: _onEatFood }: GameAreaProps) => {
  const {
    isRunning,
    snakeDots,
    food,
    setFood,
    onKeyDown,
    checkIfOutOfBorders,
    checkIfCollapsed,
    checkIfEat,
    moveSnake,
    obstacles,
    generateObstacles,
  } = useGameArea({ state, _onGameOver, _onEatFood });

  useEffect(() => {
    let interval: any = null;

    if (isRunning) {
      checkIfOutOfBorders();
      checkIfCollapsed();
      checkIfEat();
      interval = setInterval(() => moveSnake(), 200);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snakeDots, isRunning]);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFood(getRandomCoordinates);
    state?.generateObstacles && generateObstacles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.generateObstacles]);

  return (
    <div className="game-area" style={{ ...gameAreaStyles, ...userStyles?.gameArea }}>
      <Snake userStyles={userStyles} snakeDots={snakeDots} />
      <Food userStyles={userStyles} dot={food} />
      <Obstacle obstacles={obstacles} />
    </div>
  );
};

export default GameArea;
