/*
Tic-tac-toe:
1. Gameboard
    A. Initialize 3x3 grid
        -Grid is a 2D array
        -Grid consists of cell's
        -Cell's can be empty, X, or O
    B. Update gameboard state
        -Add X or O's to empty cells
        -Determine win/lose/tie
2. Two players
    A. Initialize player with default name and marker(X or O)
3. Game controller
    A. Create gameboard object
    B. Create players array
    C. Track active player's turn
    D. Start the round
4. UI/Display
*/

function Gameboard() {
    const board = [];
    const boardSize = 3;

    for(let i = 0; i < boardSize; i++) {
        board[i] = [];
        for(let j = 0; j < boardSize; j++) {
            board[i].push(Cell());
        }
    }
    const getBoard = () => board;
    const placeToken = (row,col,player) => {
        if(board[row][col].getValue === 0) {
            board[row][col].addToken(player);
        }
    }; 
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;
    return { getValue, addToken };
}

function Player(name, token) {
    const getName = () => name;
    const getToken = () => token;
    return { getName, getToken };
}

function Gamecontroller(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();
    const players = [];
    players.push(Player(playerOneName, 1));
    players.push(Player(playerTwoName, 2));
    

    let activePlayer = players[0];
    
    const switchPlayersTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
}

Gamecontroller();