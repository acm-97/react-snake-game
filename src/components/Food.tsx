import React from 'react';

import { UserStylesProps } from './GameArea';
import { foodStyles, foodWrapperStyles } from '../styles/food';

type FoodProps = {
  dot: any[];
  userStyles?: UserStylesProps;
};

const Food = ({ userStyles, dot }: FoodProps) => {
  const style = {
    ...foodWrapperStyles,
    left: `${dot[0]}%`,
    top: `${dot[1]}%`,
    ...userStyles?.food,
  };
  return (
    <div className="food-wrapper" style={style}>
      <div className="food" style={foodStyles} />
    </div>
  );
};

export default Food;
