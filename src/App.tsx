import React from 'react';

import { Food, GameArea, Snake } from '@/components';

export type AppProps = {
  speed?: number;
  canMove?: boolean;
  direction?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  snakeDots?: number[][];
  onGameOver?: () => void;
  onEatFood?: () => void;
};

function App(props: AppProps) {
  return <GameArea {...props} />;
}

export default App;
