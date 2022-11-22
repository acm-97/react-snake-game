import React from 'react';

import { snakeStyles } from '../styles/snake';


type FoodProps = {
  snakeDots: any[];
};

const Snake = ({ snakeDots }: FoodProps) => (
  <div>
    {snakeDots.map((dot, i) => {
      const style = {
        ...snakeStyles,
        left: `${dot[0]}%`,
        top: `${dot[1]}%`,
      };
      return <div className="snake" key={i} style={style} />;
    })}
  </div>
);
export default Snake;
