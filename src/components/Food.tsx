import React from 'react';

import { UserStylesProps } from './GameArea';
import { foodStyles } from '../styles/food';

type FoodProps = {
  dot: any[];
  userStyles?: UserStylesProps;
};

const Food = ({ userStyles, dot }: FoodProps) => {
  const style = {
    ...foodStyles,
    left: `${dot[0]}%`,
    top: `${dot[1]}%`,
    ...userStyles?.food,
  };
  return <div className="food" style={style} />;
};

export default Food;
