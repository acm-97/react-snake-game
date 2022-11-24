export const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y] as [number, number];
};
export const getRandomObstacles = () => {
  let min = 5;
  let max = 95;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y] as [number, number];
};

export const detectColition = (sPos: number, oPos: number) => {
  let document1 = document.getElementById(`snake-body-part-${sPos}`);
  let document2 = document.getElementById(`obstacle-${oPos}`);

  let verticalMatch = false;
  let horizontalMatch = false;
  let intersect = false;

  if (document1 && document2) {
    let div1 = document1.getBoundingClientRect();
    let div1Top = div1.top;
    let div1Left = div1.left;
    let div1Right = div1.right;
    let div1Bottom = div1.bottom;

    let div2 = document2.getBoundingClientRect();
    let div2Top = div2.top;
    let div2Left = div2.left;
    let div2Right = div2.right;
    let div2Bottom = div2.bottom;

    if ((div2Top > div1Top && div2Top < div1Bottom) || (div2Bottom > div1Top && div2Bottom < div1Bottom)) {
      verticalMatch = true;
    } else {
      verticalMatch = false;
    }

    if ((div2Right > div1Left && div2Right < div1Right) || (div2Left < div1Right && div2Left > div1Left)) {
      horizontalMatch = true;
    } else {
      horizontalMatch = false;
    }

    if (horizontalMatch && verticalMatch) {
      intersect = true;
    } else {
      intersect = false;
    }
  }
  return intersect;
};
