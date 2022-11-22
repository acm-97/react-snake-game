import React from 'react';

import { foodStyles } from '../styles/food';

type FoodProps = {
  dot: any[];
};

const Food = ({ dot }: FoodProps) => {
  const style = {
    ...foodStyles,
    left: `${dot[0]}%`,
    top: `${dot[1]}%`,
  };
  return <div className="food" style={style} />;
};

export default Food;
