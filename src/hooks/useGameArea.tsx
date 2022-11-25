import { useCallback, useMemo, useState } from 'react';

import { StateProps } from 'src/components/GameArea';

import { detectColition, getRandomCoordinates, getRandomObstacles } from '../utils';

export type useGameAreaProps = {
  _onGameOver?: (points: number) => void;
  _onEatFood?: (snakePosition: number[], foodPosition: number[]) => void;
  state?: StateProps;
};

const useGameArea = ({ state, _onGameOver, _onEatFood }: useGameAreaProps) => {
  const [food, setFood] = useState<number[]>([]);
  const [speed, setSpeed] = useState<number>(200);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [snakeDots, setSnakeDots] = useState<number[][]>([
    [0, 0],
    [2, 0],
  ]);
  const [obstacles, setObstacles] = useState<number[][]>([]);
  const [numObstacles, setNumObstacles] = useState<number>(4);

  const startGame = () => {
    setIsRunning(true);
  };

  const stopGame = () => {
    setIsRunning(false);
  };

  useMemo(() => (state?.isRunning ? startGame() : stopGame()), [state?.isRunning]);

  useMemo(() => state?.speed && setSpeed(state?.speed), [state?.speed]);

  useMemo(() => state?.direction && setDirection(state?.direction), [state?.direction]);

  useMemo(() => state?.snakeCoordinates && setSnakeDots(state?.snakeCoordinates), [state?.snakeCoordinates]);

  useMemo(() => state?.foodCoordinates && setFood(state?.foodCoordinates), [state?.foodCoordinates]);

  useMemo(() => state?.numObstacles && setNumObstacles(state?.numObstacles), [state?.numObstacles]);

  const onKeyDown = useCallback(
    (e: any) => {
      e = e || window.event;
      switch (e.keyCode) {
        case 38:
          setDirection((prev) => (prev !== 'DOWN' ? 'UP' : prev));
          break;
        case 40:
          setDirection((prev) => (prev !== 'UP' ? 'DOWN' : prev));
          break;
        case 37:
          setDirection((prev) => (prev !== 'RIGHT' ? 'LEFT' : prev));
          break;
        case 39:
          setDirection((prev) => (prev !== 'LEFT' ? 'RIGHT' : prev));
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

  const generateObstacles = useCallback(() => {
    let count = 1;
    const obs = [];
    while (count <= numObstacles) {
      const ob = getRandomObstacles();
      if (food[0] !== ob[0] || food[1] !== ob[1]) {
        obs.push(ob);
        count++;
      }
    }
    setObstacles(obs);
  }, [food, numObstacles]);

  const onGameOver = useCallback(() => {
    const points: number = snakeDots.length - 2;
    setSnakeDots(
      state?.snakeCoordinates || [
        [0, 0],
        [2, 0],
      ],
    );
    setFood(getRandomCoordinates());
    state?.generateObstacles && generateObstacles();
    setDirection(state?.direction || 'RIGHT');
    _onGameOver && _onGameOver(points);
    stopGame();
  }, [
    _onGameOver,
    generateObstacles,
    snakeDots.length,
    state?.direction,
    state?.generateObstacles,
    state?.snakeCoordinates,
  ]);

  const checkIfOutOfBorders = useCallback(() => {
    let head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  }, [onGameOver, snakeDots]);

  const checkIfCollapsed = useCallback(() => {
    let snake = [...snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot, sPos) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver();
      }
      obstacles.forEach((ob, oPos) => {
        if (detectColition(sPos, oPos)) {
          onGameOver();
        }
      });
    });
  }, [obstacles, onGameOver, snakeDots]);

  const enLargeSnake = useCallback(() => {
    let newSnake = [...snakeDots];

    newSnake.unshift([]);
    setSnakeDots(newSnake);
  }, [snakeDots]);

  const checkIfEat = useCallback(() => {
    let head = snakeDots[snakeDots.length - 1];
    let myfood = food;
    if (head[0] === myfood[0] && head[1] === myfood[1]) {
      setFood(getRandomCoordinates());
      state?.generateObstacles && generateObstacles();
      enLargeSnake();
      _onEatFood && _onEatFood(head, myfood);
    }
  }, [_onEatFood, enLargeSnake, food, generateObstacles, snakeDots, state?.generateObstacles]);

  return {
    snakeDots,
    setSnakeDots,
    speed,
    setSpeed,
    isRunning,
    food,
    setFood,
    onKeyDown,
    moveSnake,
    checkIfOutOfBorders,
    checkIfCollapsed,
    checkIfEat,
    enLargeSnake,
    onGameOver,
    startGame,
    stopGame,
    obstacles,
    generateObstacles,
  };
};

export default useGameArea;
