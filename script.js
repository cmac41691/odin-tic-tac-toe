 // The game board 
 const thegameBoard = (() => {
     const board =["","", "", "", "", "","", "", "" ];

const updateCell = (index, mark) => {
    board[index] = mark;
}

const getBoard = () => board;

const reset = () => {
board.fill("");
};

return {    
 board,
 getBoard: () => board,
 updateCell: (index, value) => { board[index] = value;},
 reset: () => board.fill("")
};
})();  

// This is the factory function
// It will create players
const player = (name, mark) =>{
    return {name, mark}
}
// Combination and game logic
const playerX = player( "X");
const playerY = player( "O");
// Wining Combinations
const Combination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]
// Valid move checker parameter
const yourMovecorrect = (tile) => {
    if (tile.innerText === "X"  || tile.innerText === "O"){
        return false; 
    }
    return true;
};
// Updates where players are on the board
const boardUpdate = (index, mark) => {
   thegameBoard.updateCell(index, mark);
};
// Game Controllers 
const Gamecontrollers = () => {
let currentPlayer = playerX;

const switchPlayer = () => {
currentPlayer = (currentPlayer === playerX) ? playerY : playerX;
}

const playTurn = (index) => {
  if(thegameBoard.getBoard()[index] !== "") return

  thegameBoard.updateCell(index, currentPlayer.mark);
    
// Place to check for winner
    const playerWon = (mark) => {
    return Combination.some( combo =>
    combo.every(index => thegameBoard()[index] === mark)    
    );
};
thegameBoard.updateCell(index, currentPlayer.mark);
// This is a  check winner
    if (checkWinner(currentPlayer.mark)) {
        console.log(`${currentPlayer.name} wins!`);
        disableButton();
        return;
    }
// This will check for a tie
    if(thegameBoard.getBoard().every(cell => cell !== "")){
        console.log("It's a draw!");
        disableButton();
        return;
    }

// No win or tie it switch player
switchPlayer();

  

  switchPlayer();
};
return {
    playTurn
};

}
// This selects all tiles
const cell = document.querySelectorAll(".cell");

// It will listen for clicks
cell.forEach((cell, index) => {
 cell.addEventListener("click", () => {

    Gamecontrollers.playTurn(index);
});

});