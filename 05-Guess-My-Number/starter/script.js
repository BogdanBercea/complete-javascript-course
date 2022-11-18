'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 10;
let gameDone = false;
let highScore = 0;

const decreaseScore = () => {
  document.querySelector('.score').textContent = --score;
}

const setMessageContent = (message) => {
  document.querySelector('.message').textContent = message;
}

const setBodyColor = (color) => {
  document.querySelector('body').style.backgroundColor = color;
}

const changeElementWidth = (selector, newWidth) => {
  document.querySelector(selector).style.width = newWidth;
}

const changeElementTextContent = (selector, value) => {
  document.querySelector(selector).textContent = value;
}

const resetInputValue = () => {
  document.querySelector('.guess').value = '';
}

const resetGameValues = () => {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 10;
  gameDone = false;
}

const buttonClickHandler = () => {
  if (gameDone) {
    return;
  }

  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    setMessageContent('XXX You need to type a number in the input field!!!');
  }

  if (score && (guess < secretNumber)) {
    setMessageContent('To low!');
    decreaseScore();
  }

  if (score && (guess > secretNumber)) {
    setMessageContent('To high!');
    decreaseScore();
  }

  if (score === 0) {
    gameDone = true;
    setMessageContent(':((( You lost the game!');
  }

  if (guess === secretNumber) {
    setMessageContent('Hurraaa! Correct Number!');
    setBodyColor('#60b347');
    changeElementWidth('.number', '30rem');
    changeElementTextContent('.number', secretNumber);

    if (score > highScore) {
      highScore = score;
      changeElementTextContent('.highscore', highScore);
    }

    gameDone = true;
  }
}

const restartGameHandler = () => {
  resetGameValues();
  setBodyColor('#222');
  changeElementWidth('.number', '15rem');
  changeElementTextContent('.number', '?');
  changeElementTextContent('.score', score);
  setMessageContent('Start guessing...');
  resetInputValue();
}

changeElementTextContent('.score', score);

document.querySelector('.check').addEventListener('click', buttonClickHandler);
document.querySelector('.again').addEventListener('click', restartGameHandler);