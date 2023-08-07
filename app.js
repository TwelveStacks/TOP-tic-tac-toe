const cellList = document.querySelectorAll('.box');
const restartBtn = document.getElementById('reset-button');
const statusDisplay = document.querySelector(".status-display")
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let currentPlayer = "X";
let running = true;

initializeGame();

restartBtn.addEventListener('click', initializeGame)

function initializeGame() {
    cellList.forEach(cell => {
        cell.classList.remove("X");
        cell.classList.remove("O");
        cell.innerText = "";
        cell.removeEventListener('click', boxClicked)
        cell.addEventListener('click', boxClicked, { once: true })
    });
    running = true;
    currentPlayer = "X";
    updateDisplay();
}

function boxClicked() {
    if (running === true) {
        // place marker
        placeMarker(this);
        // check for win
        if(checkWin(currentPlayer)){
            // Show win message
            winMessage();
            running = false;
        } else if(isDraw()) {
            // check for draw
            statusDisplay.innerText = `DRAW!`
        } else {
            // change player
            switchTurn();
        }
    }
}

function placeMarker(cell) {
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer);
}

function switchTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    updateDisplay();
}

function updateDisplay() {
    statusDisplay.innerText = `${currentPlayer}'s turn`
}

function winMessage() {
    statusDisplay.innerText = `${currentPlayer} WINS!`
}

function checkWin(currentPlayer) {
    return winConditions.some(combination => {
        return combination.every((index) => {
            return cellList[index].classList.contains(currentPlayer);
        })
    })
}

function isDraw(){
    return [...cellList].every(cell => {
        return cell.classList.contains("X") || cell.classList.contains("O");
    })
}