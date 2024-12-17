let playerScore = 0;
let computerScore = 0;

const options = document.querySelectorAll(".option");
const message = document.querySelector("#message");

const playerScoreElement = document.querySelector("#player-score");
const computerScoreElement = document.querySelector("#computer-score");

// Function to generate computer choice
const generateComputerChoice = () => {
    const choices = ["stone", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
};

// Function to display draw message
const drawGame = () => {
    message.innerText = "Game was Draw. Play again.";
    message.style.backgroundColor = "#2d2d2d";
};

// Function to display winner of the round
const showWinner = (playerWins, playerChoice, computerChoice) => {
    if (playerWins) {
        playerScore++;
        playerScoreElement.innerText = playerScore;
        message.innerText = `You win! Your ${playerChoice} beats ${computerChoice}`;
        message.style.backgroundColor = "green";
    } else {
        computerScore++;
        computerScoreElement.innerText = computerScore;
        message.innerText = `You lost. ${computerChoice} beats your ${playerChoice}`;
        message.style.backgroundColor = "red";
    }
};

// Function to show the winner modal and redirect
const showWinnerModal = (winner) => {
    // Create modal dynamically
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.backgroundColor = "white";
    modal.style.borderRadius = "10px";
    modal.style.boxShadow = "0px 0px 15px rgba(0, 0, 0, 0.3)";
    modal.style.padding = "2rem";
    modal.style.textAlign = "center";
    modal.style.zIndex = "1000";

    const modalText = document.createElement("p");
    modalText.innerText = `${winner} wins the game!`;
    modalText.style.fontSize = "1.5rem";
    modalText.style.marginBottom = "1rem";

    const modalButton = document.createElement("button");
    modalButton.innerText = "OK";
    modalButton.style.padding = "0.5rem 1rem";
    modalButton.style.fontSize = "1rem";
    modalButton.style.border = "none";
    modalButton.style.backgroundColor = "#2d2d2d";
    modalButton.style.color = "white";
    modalButton.style.borderRadius = "5px";
    modalButton.style.cursor = "pointer";

    modalButton.addEventListener("click", () => {
        window.location.href = "summary.html"; // Replace with your summary page URL
    });

    modal.appendChild(modalText);
    modal.appendChild(modalButton);
    document.body.appendChild(modal);

    // Disable further clicks
    options.forEach(option => option.removeEventListener("click", optionClickHandler));
};

// Function to check if the game is over
const checkGameOver = () => {
    if (playerScore === 20 || computerScore === 20) {
        const winner = playerScore === 20 ? "Player" : "Computer";
        showWinnerModal(winner);
    }
};

// Function to handle each round of the game
const playGame = (playerChoice) => {
    const computerChoice = generateComputerChoice();

    if (playerChoice === computerChoice) {
        drawGame();
    } else {
        let playerWins = true;
        if (playerChoice === "stone") {
            playerWins = computerChoice === "paper" ? false : true;
        } else if (playerChoice === "paper") {
            playerWins = computerChoice === "scissors" ? false : true;
        } else {
            playerWins = computerChoice === "stone" ? false : true;
        }
        showWinner(playerWins, playerChoice, computerChoice);
    }
    checkGameOver();
};

// Event handler for options
const optionClickHandler = (event) => {
    const playerChoice = event.target.getAttribute("id");
    playGame(playerChoice);
};

// Add event listeners to options
options.forEach(option => {
    option.addEventListener("click", optionClickHandler);
});
