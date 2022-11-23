import React from 'react';

import { UserStylesProps } from './GameArea';
import { obstacleStyles } from '../styles/obstacle';

type ObstacleProps = {
  obstacles: number[][];
  userStyles?: UserStylesProps;
};

const Obstacle = ({ userStyles, obstacles }: ObstacleProps) => (
  <div>
    {obstacles.map((dot, i) => {
      const style = {
        ...obstacleStyles,
        left: `${dot[0]}%`,
        top: `${dot[1]}%`,
        ...userStyles?.obstacles,
      };
      return <div className="obstacle" key={i} style={style} />;
    })}
  </div>
);
export default Obstacle;
