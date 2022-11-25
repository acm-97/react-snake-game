
# @acm-97/react-snake-game

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

This repo is based on the idea of the classic snake games, with the exception that this component accepts some options, which makes it more customizable, something I wanted for my project and I have not found in others.

You can clone it and step by step create your own NPM package and publish it.

It is simple React counter.

[**Live Demo**](https://acm-97.github.io/react-snake-game/)

## Installation

```bash
npm install @acm-97/react-snake-game
```

or

```bash
yarn add @acm-97/react-snake-game
```

## Available props

| Props         | Description |
| :----------- | :--------- |
| onGameOver    | you can pass a function here and recive the number of points collected |
| onEatFood     | do anything after eat  |
| onMove     |  you can pass a function here and recive the current positions of snake's head and food  |
| styles        | you can pass in plain object styles here   |
| state         | this is like the initial state for the component     |

### State props

| Props         | Default       | Description  |
| :----------- |:-------------| :-----|
| snakeCoordinates | `[ [0, 0], [2, 0] ]` | initial position for the snake |
| foodCoordinates | `random` | initial position for the food |
| direction | `RIGHT` | initial direction for the snake to move |
| speed | `200` | speed of the snake |
| isRunning | `false` | tells the component if the snake can move or not |
| generateObstacles | `false` | to add another level of difficulty you can add obstacles along the way |
| numObstacles | `4` |  number of obstacles to add  |

### Styles props

| Props         | Description  |
| :----------- |:-------------|
| gameArea  | plain object styles for the game area container |
| snake | plain object styles for the snake element |
| food  | plain object styles for the food element |
| obstacles  | plain object styles for obstacle element |

> Styles can also be accessed through the `.class` selector
>
> * **for gameArea:** `.game-area`
> * **for snake:** `.snake-body`  and `.snake-body-part-"specific part(number) of the snake"`
> * **for food:** `.food-wrapper`  and `.food`
> * **for obstacles:** `.obstacle`

## Some usage examples

For a basic usage add `GameArea` to your component:

```js
import GameArea from '@acm-97/react-snake-game';

const Component = () => (
  <GameArea state={{ isRunning }} />
);
```

If you want some obstacles in the way add the option `generateObstacles` to your component's state:

```js
import GameArea from '@acm-97/react-snake-game';

const Component = () => (
  <GameArea state={{ isRunning, generateObstacles: true }}
);
```

If you want to display the score for every game, add `onGameOver` to your component:

```js
import React, { useState } from 'react';
import GameArea from '@acm-97/react-snake-game';

const Component = () => {
  const [score, setScore] = useState(0);

  const stopGame =(value: number) => {
      setScore(value);
  };

  return  (
    <div>
      <GameArea state={{ isRunning }} onGameOver={stopGame} />
      <div>
        SCORE: {score}
      </div>
    </div>
)};
```

[npm-url]: https://www.npmjs.com/package/@acm-97/react-snake-game
[npm-image]: https://img.shields.io/npm/v/@acm-97/react-snake-game
[github-license]: https://img.shields.io/github/license/@acm-97/react-snake-game
[github-license-url]: https://github.com/acm-97/react-snake-game/blob/main/LICENCE.md
[github-build]: https://github.com/acm-97/react-snake-game/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/acm-97/react-snake-game/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/@acm-97/react-snake-game
