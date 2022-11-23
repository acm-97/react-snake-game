import React from 'react';

import { UserStylesProps } from './GameArea';
import { snakeStyles } from '../styles/snake';

type FoodProps = {
  snakeDots: any[];
  userStyles?: UserStylesProps;
};

const Snake = ({ userStyles, snakeDots }: FoodProps) => (
  <div className="snake-body">
    {snakeDots.map((dot, i) => {
      const style = {
        ...snakeStyles,
        left: `${dot[0]}%`,
        top: `${dot[1]}%`,
        ...userStyles?.snake,
      };
      return <div className="snake-body-part" key={i} style={style} />;
    })}
  </div>
);
export default Snake;
