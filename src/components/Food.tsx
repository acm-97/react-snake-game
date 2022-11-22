import React from 'react';

type FoodProps = {
  dot: any[];
};

const Food = ({ dot }: FoodProps) => {
  const style = {
    left: `${dot[0]}%`,
    top: `${dot[1]}%`,
  };
  return <div className="food" style={style} />;
};

export default Food;
