import { useCallback, useState } from 'react';

import { getRandomCoordinates } from '../utils';

export type useSnakeProps = {
  _speed?: number;
  _canMove?: boolean;
  _direction?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  _snakeDots?: number[][];
  _onGameOver?: (points: number) => void;
  _onEatFood?: (snakePosition: number[], foodPosition: number[]) => void;
};

const useSnake = ({ _speed, _canMove, _direction, _snakeDots, _onGameOver, _onEatFood }: useSnakeProps) => {
  const [food, setFood] = useState<number[]>([]);
  const [speed, setSpeed] = useState<number>(_speed || 200);
  const [canMove, setCanmove] = useState<boolean>(_canMove || true);
  const [direction, setDirection] = useState<string>(_direction || 'RIGHT');
  const [snakeDots, setSnakeDots] = useState<number[][]>(
    _snakeDots || [
      [0, 0],
      [2, 0],
    ],
  );

  const onKeyDown = useCallback(
    (e: any) => {
      e = e || window.event;
      switch (e.keyCode) {
        case 38:
          setDirection('UP');
          break;
        case 40:
          setDirection('DOWN');
          break;
        case 37:
          setDirection('LEFT');
          break;
        case 39:
          setDirection('RIGHT');
          break;

        default:
          break;
      }
    },
    [setDirection],
  );

  const moveSnake = useCallback(
    () => {
      let dots = [...snakeDots];
      let head = dots[dots.length - 1];
      // [0, 0],
      // [2, 0],

      switch (direction) {
        case 'RIGHT':
          head = [head[0] + 2, head[1]];
          break;
        case 'LEFT':
          head = [head[0] - 2, head[1]];
          break;
        case 'DOWN':
          head = [head[0], head[1] + 2];
          break;
        case 'UP':
          head = [head[0], head[1] - 2];
          break;

        default:
          break;
      }
      if (direction) {
        dots.push(head);
        dots.shift();
        // console.log("before timeout", dots, snakeDots);
        setSnakeDots([...dots]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [direction, snakeDots],
  );

  const onGameOver = () => {
    const points: number = snakeDots.length - 2;
    setSnakeDots([
      [0, 0],
      [2, 0],
    ]);
    setCanmove(false);
    setFood(getRandomCoordinates());
    _onGameOver && _onGameOver(points);
  };

  const checkIfOutOfBorders = () => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  };

  const checkIfCollapsed = () => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver();
      }
    });
  };

  const enLargeSnake = () => {
    let newSnake = [...snakeDots];

    newSnake.unshift([]);
    setSnakeDots(newSnake);
  };

  const checkIfEat = () => {
    let head = snakeDots[snakeDots.length - 1];
    let myfood = food;
    if (head[0] === myfood[0] && head[1] === myfood[1]) {
      setFood(getRandomCoordinates());
      enLargeSnake();
      _onEatFood && _onEatFood(head, myfood);
    }
  };

  return {
    snakeDots,
    setSnakeDots,
    speed,
    setSpeed,
    canMove,
    setCanmove,
    food,
    setFood,
    onKeyDown,
    moveSnake,
    checkIfOutOfBorders,
    checkIfCollapsed,
    checkIfEat,
    enLargeSnake,
    onGameOver,
  };
};

export default useSnake;
