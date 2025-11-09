const main = document.querySelector('.main');
let player1Score = 0;
let player2Score = 0;
let currentRound = 1;
let totalRounds = 5;
let player1Choice = '';
let player2Choice = '';

function createButtons(player, func) {
  main.innerHTML = '';

  const h1 = document.createElement('h1');
  h1.textContent = `Round ${currentRound} its ${player}'s turn`;
  h1.style.textAlign = 'center';

  const h3 = document.createElement('h3');
  h3.textContent = 'Please select your choice';
  h3.style.textAlign = 'center';

  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'center';

  const choices = ['ROCK', 'PAPER', 'SCISSORS'];
  choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.addEventListener('click', () => func(choice.toLowerCase()));
    buttonDiv.appendChild(btn);
  });

  main.appendChild(h1);
  main.appendChild(h3);
  main.appendChild(buttonDiv);
}

function showRoundResult() {
  const result = document.createElement('h2');
  const element=document.createElement('h2');
  element.style.textAlign="center";
  element.style.marginTop="20px"
  result.style.textAlign = 'center';
  result.style.marginTop = '20px';

  if (player1Choice === player2Choice) {
    result.textContent = `Round ${currentRound}: It's a tie! Both chose ${player1Choice.toUpperCase()}`;
    element.textContent=`wait for round ${currentRound+1}`;
  } else if (
    (player1Choice === 'rock' && player2Choice === 'scissors') ||
    (player1Choice === 'paper' && player2Choice === 'rock') ||
    (player1Choice === 'scissors' && player2Choice === 'paper')
  ) {
    result.textContent = `Round ${currentRound}: Player 1 wins! ${player1Choice.toUpperCase()} beats ${player2Choice.toUpperCase()}`;
    element.textContent=`wait for round ${currentRound+1}`;
    player1Score++;
  } else {
    result.textContent = `Round ${currentRound}: Player 2 wins! ${player2Choice.toUpperCase()} beats ${player1Choice.toUpperCase()}`;
    element.textContent=`wait for round ${currentRound+1}`;
    player2Score++;
  }

  main.appendChild(result);
  main.appendChild(element);

  currentRound++;

  if (currentRound <= totalRounds) {
    setTimeout(() => nextRound(), 3000);
  } else {
    setTimeout(() => showFinalResults(), 3000);
    element.textContent="";
  }
}

function nextRound() {
  createButtons('Player 1', (choice1) => {
    player1Choice = choice1;

    createButtons('Player 2', (choice2) => {
      player2Choice = choice2;

      showRoundResult();
    });
  });
}

function showFinalResults() {
  main.innerHTML = '';
  const finalScore = document.createElement('h2');
  finalScore.textContent = `Final Scores - Player1 scores ${player1Score}, and Player2 scores ${player2Score}`;
  finalScore.style.textAlign = 'center';

  const winner = document.createElement('h2');
  winner.style.textAlign = 'center';

  if (player1Score > player2Score) {
    winner.textContent = '🏆 Player 1 is the overall winner!';
  } else if (player2Score > player1Score) {
    winner.textContent = '🏆 Player 2 is the overall winner!';
  } else {
    winner.textContent = '🤝 It\'s a tie overall!';
  }

  main.appendChild(finalScore);
  main.appendChild(winner);
}

function startGame() {
  player1Score = 0;
  player2Score = 0;
  currentRound = 1;
  nextRound();
}

startGame();
