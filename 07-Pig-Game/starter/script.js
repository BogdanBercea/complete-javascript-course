'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const PLAYER_1 = 0;
const PLAYER_2 = 1;

let scores = [0, 0];

let currentScore = 0;
let activePlayer = PLAYER_1;

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const setCurrentScoreForActivePlayer = (score) => {
  document.getElementById(`current--${activePlayer}`).textContent = score;
}

const switchPlayersState = () => {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  activePlayer = (activePlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
}

const setGlobalCurrentScore = (score) => {
  if (score >= 0) {
    currentScore = score;
  }
}

const switchPlayer = () => {
  setCurrentScoreForActivePlayer(0);
  switchPlayersState();
  setGlobalCurrentScore(0)
}

const changePlayersScores = () => {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
}

const resetGameData = () => {
  currentScore = 0;
  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

const rollDiceHandler = () => {
  // Generate random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`

  // Check for roll === 1: if true, switch players
  if (dice !== 1) {
    // Add dice to current score
    setGlobalCurrentScore(currentScore + dice);
    setCurrentScoreForActivePlayer(currentScore);
  }

  if (dice === 1) {
    switchPlayer();
  }
}

const holdClickHandler = () => {
  changePlayersScores();

  if (scores[activePlayer] >= 100) {
    resetGameData();
    return;
  }

  switchPlayer();
}

const newGameListener = () => {
  resetGameData();
}

btnRoll.addEventListener('click', rollDiceHandler);
btnHold.addEventListener('click', holdClickHandler);
btnNew.addEventListener('click', newGameListener);