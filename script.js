 // The game board 
 const thegameBoard = (() => {
     const board =["","", "", "", "", "","", "", "" ];

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