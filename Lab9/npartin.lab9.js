function playGame(userChoice) {

    // Sets user and computer choices
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    // Sets for choices
    document.getElementById('user-choice').innerText = `Your Choice: ${userChoice}`;
    document.getElementById('computer-choice').innerText = `Computer's Choice: ${computerChoice}`;

    // Determines winner and sets text for winner
    const winner = determineWinner(userChoice, computerChoice);
    document.getElementById('result').innerText = `Result: ${winner}`;

    // Browser updates text before play again is confirmed
    setTimeout(() => {
        if (confirm('Do you want to play again?')) {
            resetGame();
        } else {
            // Nothing (For right now)
        }
    }, 100);
}

// Function to determine winner
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "It's a tie!";
    }
    if ((userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'scissors' && computerChoice === 'paper') ||
        (userChoice === 'paper' && computerChoice === 'rock')) {
        return "You win!";
    }
    return "Computer wins!";
}

// Resets game
function resetGame() {
    document.getElementById('user-choice').innerText = 'Your Choice: ';
    document.getElementById('computer-choice').innerText = 'Computers Choice: ';
    document.getElementById('result').innerText = 'Result: ';
}

