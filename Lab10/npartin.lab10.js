//Event Listeners for Buttons
//Each Button click listener Starts Game
document.getElementById('rock').addEventListener('click', function() { playGame('rock'); });
document.getElementById('paper').addEventListener('click', function() { playGame('paper'); });
document.getElementById('scissors').addEventListener('click', function() { playGame('scissors'); });

//Function to Get Computer Choice for Gameplay
//Uses Random Index of Array of the 3 Choices
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

//Function to Determine the Winner Between User and Computer
//Returns a String
function determineWinner(userChoice, computerChoice) {
    //Tie
    if (userChoice === computerChoice) {
        return 'tie';
    }
    //User Wins
    if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'user';
    }
    //Computer Wins
    return 'computer';
}

//Parameter userChoice is declared When Respective Button is Clicked
//Utilizes functions getComputerChoice & determineWinner
function playGame(userChoice) {
    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);
    displayResult(userChoice, computerChoice, winner);
}

//Displays Result on Screen
function displayResult(userChoice, computerChoice, winner) {
    const resultDiv = document.getElementById('result');
    let resultMessage = `You chose ${userChoice}, Computer chose ${computerChoice}.`;
    //Logic Based on Winner
    if (winner === 'tie') {
        resultMessage += " It's a tie!";
    } else if (winner === 'user') {
        resultMessage += " You win!";
    } else {
        resultMessage += " You lose!";
    }
    //Displays Winner
    resultDiv.textContent = resultMessage;
}
