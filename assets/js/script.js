// Variables pour le score
var playerScore = 0;
var computerScore = 0;
var gameHistory = [];

// Sélécteurs
var buttons = document.querySelectorAll(".choice");
var resultDiv = document.getElementById("result");
var historySection = document.getElementById("history-section");
var clearHistoryButton = document.getElementById("clear-history");

// Charger l'historique à partir du localStorage lors du chargement de la page
gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];

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

        // Sauvegarder le résultat dans l'historique si une partie est terminée
        if (playerScore === 5 || computerScore === 5) {
            gameHistory.push(result);
            saveGameHistory();
            displayGameHistory();
        }
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
function displayChoices(computerChoice) {
    var computerChoiceDiv = document.getElementById("computer-choice");
    computerChoiceDiv.innerHTML = `<p>L'ordinateur a choisi : <strong>${computerChoice}</strong></p>`;
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
        resultDiv.innerHTML = "<p>Égalité !</p>";
        let imgDeuce = document.createElement("img");
        imgDeuce.classList.add("pb-3");
        imgDeuce.src = "assets/img/egalite.gif";
        resultDiv.append(imgDeuce);
    } else if (result === "player") {
        resultDiv.innerHTML = "<p>Vous avez gagné !</p>";
        let imgWin = document.createElement("img");
        imgWin.classList.add("pb-3");
        imgWin.src = "assets/img/victoire.gif";
        resultDiv.append(imgWin);
    } else {
        resultDiv.innerHTML = "<p>Vous avez perdu !</p>";
        let imgLose = document.createElement("img");
        imgLose.classList.add("pb-3");
        imgLose.src = "assets/img/defaite.gif";
        resultDiv.append(imgLose);
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
    resultDiv.innerHTML = "<p>Choisissez votre arme !</p>";
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

// Sauvegarder l'historique des parties dans le localStorage
function saveGameHistory() {
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
}

// Afficher l'historique des parties
function displayGameHistory() {
    historySection.innerHTML = "";

    for (var i = 0; i < gameHistory.length; i++) {
        var gameResult = gameHistory[i];
        var gameResultText = "";

        if (gameResult === "draw") {
            gameResultText = "Égalité";
        } else if (gameResult === "player") {
            gameResultText = "Victoire du joueur";
        } else {
            gameResultText = "Victoire de l'ordinateur";
        }

        var gameResultItem = document.createElement("p");
        gameResultItem.textContent = `Partie ${i + 1}: ${gameResultText}`;
        historySection.appendChild(gameResultItem);
    }
}

// Fonction pour supprimer l'historique des parties
function clearGameHistory() {
    gameHistory = [];
    saveGameHistory();
    displayGameHistory();
}

clearHistoryButton.addEventListener("click", clearGameHistory);
