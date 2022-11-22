import React, { useEffect } from 'react';

import logo from './logo.svg';
import { useSnake } from './hooks';
import { Food, Snake } from './components';

function App() {
  const { canMove, snakeDots, food, onKeyDown, checkIfOutOfBorders, checkIfCollapsed, checkIfEat, moveSnake } = useSnake();

  useEffect(() => {
    let interval: any = null
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
    <div className="game-area">
      <Snake snakeDots={snakeDots} />
      <Food dot={food} />
    </div>
  );
}

export default App;
