'use strict';

/*In this game the first player who will reach at 100 points wins the game!
Each player must rolling the dice and when he "feel comftable", must press the HOLD button to save his points but in case the dice displays the number '1', the player LOSES his
turn and ALL OF HIS POINTS!!! 
*/

//Selecting the Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const Totalscore0El = document.querySelector('#score--0');
const Totalscore1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const winnerDisplay = document.querySelector('.WINNER');

let scores, currentscore, activePlayer, playing;

//This is the initialization of the variables
const init = function () {
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  Totalscore0El.textContent = 0;
  Totalscore1El.textContent = 0;
  winnerDisplay.textContent = null;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

//The "Switchplayer" functionality
const switchPlayer = function () {
  if (activePlayer === 0) {
    activePlayer = 1;
    current0El.textContent = 0;
    currentscore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  } else {
    activePlayer = 0;
    current1El.textContent = 0;
    currentscore = 0;
    player1El.classList.toggle('player--active');
    player0El.classList.toggle('player--active');
  }
};

//Rolling dice functionallity
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. check if rolled 1: if Yes, switch to Next player, else keep playing
    if (dice !== 1) {
      currentscore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else switchPlayer();
  }
});

// Hold Button functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to total player's score on the board
    scores[activePlayer] += currentscore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      winnerDisplay.textContent = `Player ${activePlayer + 1} WINS`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
