// Variables pour le score
var playerScore = 0;
var computerScore = 0;

// Sélection des boutons et du résultat
var buttons = document.querySelectorAll(".choice");
var resultDiv = document.getElementById("result");

// Ajouter des écouteurs d'événements aux boutons
buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        var playerChoice = button.id;
        var computerChoice = getComputerChoice();
        var result = playRound(playerChoice, computerChoice);

        displayChoices(playerChoice, computerChoice);
        updateScore(result);
        displayResult(result);

        checkGameOver();
    });
});

// Obtenir le choix aléatoire de l'ordinateur
function getComputerChoice() {
    var choices = ["Pierre", "Feuille", "Ciseaux"];
    var randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Jouer un tour et retourner le résultat
function playRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "draw";
    } else if (
        (playerChoice === "Pierre" && computerChoice === "Ciseaux") ||
        (playerChoice === "Feuille" && computerChoice === "Pierre") ||
        (playerChoice === "Ciseaux" && computerChoice === "Feuille")
    ) {
        return "player";
    } else {
        return "computer";
    }
}

// Afficher les choix du joueur et de l'ordinateur
function displayChoices(playerChoice, computerChoice) {
    var computerChoiceDiv = document.getElementById("computer-choice");
    computerChoiceDiv.innerHTML = `<p>L'ordinateur à choisi : <strong>${computerChoice}</strong></p>`;
}

// Mettre à jour le score
function updateScore(result) {
    if (result === "player") {
        playerScore++;
    } else if (result === "computer") {
        computerScore++;
    }
    updateScoreboard();
}

// Afficher le résultat
function displayResult(result) {
    if (result === "draw") {
        resultDiv.innerHTML = "<p>Egalité!</p>";
    } else if (result === "player") {
        resultDiv.innerHTML = "<p>Vous avez gagné !</p>";
    } else {
        resultDiv.innerHTML = "<p>Vous avez perdu !</p>";
    }
}

// Mettre à jour le scoreboard
function updateScoreboard() {
    var playerScoreDiv = document.querySelector(".player-score");
    var computerScoreDiv = document.querySelector(".computer-score");
    playerScoreDiv.textContent = `Player: ${playerScore}`;
    computerScoreDiv.textContent = `Computer: ${computerScore}`;
}

// Vérifier si le jeu est terminé
function checkGameOver() {
    if (playerScore === 5 || computerScore === 5) {
        var playAgainBtn = document.getElementById("play-again");
        playAgainBtn.style.display = "block";
        buttons.forEach(function (button) {
            button.disabled = true;
        });
        playAgainBtn.addEventListener("click", resetGame);
    }
}

// Réinitialiser le jeu
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScoreboard();
    resultDiv.innerHTML = "<p>Choissisez votre arme !</p>";
    var computerChoiceDiv = document.getElementById("computer-choice");
    computerChoiceDiv.innerHTML = "";
    var playAgainBtn = document.getElementById("play-again");
    playAgainBtn.style.display = "none";
    buttons.forEach(function (button) {
        button.disabled = false;
    });
}

// Mettre à jour le scoreboard initial
updateScoreboard();