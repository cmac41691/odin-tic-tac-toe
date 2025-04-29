// The game board
const thegameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const updateCell = (index, mark) => {
    board[index] = mark;
  };

  const getBoard = () => board;

  const reset = () => {
    board.fill("");
  };

  return {
    board,
    getBoard,
    updateCell,
    reset,
  };
})();

// Factory function to create players
const player = (name, mark) => {
  return { name, mark };
};

// Players
const playerX = player("X", "X");
const playerY = player("O", "O");

// Winning combinations
const Combination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Message display
const messageDisplay = document.getElementById("message");

// Game controller
const Gamecontrollers = (() => {
  let currentPlayer = playerX;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerY : playerX;
  };

  const checkWinner = (mark) => {
    return Combination.some((combo) =>
      combo.every((index) => thegameBoard.getBoard()[index] === mark)
    );
  };

  const playTurn = (index) => {
    if (thegameBoard.getBoard()[index] !== "") return;

    thegameBoard.updateCell(index, currentPlayer.mark);

    switch (true) {
      case checkWinner(currentPlayer.mark):
        messageDisplay.innerText = `${currentPlayer.name} wins!`;
        disableButton();
        break;

      case thegameBoard.getBoard().every((cell) => cell !== ""):
        messageDisplay.innerText = "It's a draw!";
        disableButton();
        break;

      default:
        switchPlayer();
        messageDisplay.innerText = `${currentPlayer.name}'s turn`;
        break;
    }
  };

  const resetGame = () => {
    currentPlayer = playerX;
  };

  return {
    playTurn,
    resetGame,
  };
})();

// Select all tiles
const cells = document.querySelectorAll(".cell");

// Event listener for all cells
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    Gamecontrollers.playTurn(index);
    cell.innerText = thegameBoard.getBoard()[index];
  });
});

// Disable cell interaction after win/tie
function disableButton() {
  cells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
}

//  Reset button logic
const resetButton = document.getElementById("reset-btn");

resetButton.addEventListener("click", () => {
  thegameBoard.reset(); // Clears board array

  cells.forEach((cell) => {
    cell.innerText = "";
    cell.style.pointerEvents = "auto"; // Re-enable clicking
  });

  Gamecontrollers.resetGame(); // Reset current player to X
  messageDisplay.innerText = "Player X's turn";
});
