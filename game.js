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
    E. Expose controls to start a new game and play a round
4. UI/Display

    [0 0] [0 1] [0 2]
    [1 0] [1 1] [1 2]
    [2 0] [2 1] [2 2]
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

    const resetBoard = () => {
        for(let i = 0; i < boardSize; i++) {
            for(let j = 0; j < boardSize; j++) {
                board[i][j].resetToken();
            }
        }
    };
    const getBoard = () => board;
    const getBoardSize = () => boardSize;
    const placeToken = (row,col,player) => {
        if(board[row][col].getValue() === 0) {
            board[row][col].addToken(player);
            return true;
        }
        else {
            console.log("Marker already exists at that row/col.");
            return false;
        }
    };
    const printBoard = () => {
        const boardWithCellValues = board.map(row => row.map(cell => cell.getValue()));
        console.log(boardWithCellValues);
    };
    
    return { getBoard, placeToken, printBoard, resetBoard, getBoardSize };
}

function Cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };
    const resetToken = () => {
        value = 0;
    };
    const getValue = () => value;
    return { getValue, addToken, resetToken };
}

function Player(name, token) {
    const getName = () => name;
    const getToken = () => token;
    return { getName, getToken };
}

function Gamecontroller(playerOneName = "Player One", playerTwoName = "Player Two") {
    const board = Gameboard();
    const players = [];
    players.push(Player(playerOneName, "X"));
    players.push(Player(playerTwoName, "O"));
    
    let activePlayer = players[0];

    const switchPlayersTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().getName()}'s turn.`)
    };
    const startNewGame = () => {
        board.resetBoard();
        activePlayer = players[0];
        printNewRound();
    };
    const playRound = (row,col) => {
        console.log(`Placing ${getActivePlayer().getName()}'s token at row:${row} col:${col}`)
        if(board.placeToken(row,col,getActivePlayer().getToken())) {
            if(!checkForWinner()) {
                switchPlayersTurn();
            }
        }
        printNewRound();
    };
    const declareWinner = () => {
        alert(`${activePlayer.getName()} wins!!!`);
        startNewGame();
    };
    const checkForWinner = () => {
        const activePlayerToken = activePlayer.getToken();
        const boardSize = board.getBoardSize();
        const filteredBoard = board.getBoard();
        let threeCount = 0;

        //Check for 3 in a row horizontally
        filteredBoard.forEach(row => 
            row.filter(cell => {
                if(cell.getValue() === activePlayerToken) threeCount++;
                else threeCount = 0;
                if(threeCount === 3) {
                    declareWinner();
                    return true;
                }
            }));

        //Check for 3 in a row vertically
        threeCount = 0;
        for(let col = 0; col < boardSize; col++) {
            for(let row = 0; row < boardSize; row++) {
                if(filteredBoard[row][col].getValue() === activePlayerToken) threeCount++;
                else threeCount = 0;
                if(threeCount === 3) {
                    declareWinner();
                    return true;
                }
            }
        }

        //Check for 3 in a row diagonally
        if(activePlayerToken === filteredBoard[0][0].getValue() && 
            filteredBoard[0][0].getValue() === filteredBoard[1][1].getValue() && 
            filteredBoard[0][0].getValue() === filteredBoard[2][2].getValue()) {
                declareWinner();
                return true;
            }
        if(activePlayerToken === filteredBoard[2][0].getValue() && 
            filteredBoard[2][0].getValue() === filteredBoard[1][1].getValue() && 
            filteredBoard[2][0].getValue() === filteredBoard[0][2].getValue()) {
                declareWinner();
                return true;
            }
        return false;
    };
    startNewGame();
    return { playRound, startNewGame, getActivePlayer, getBoard:board.getBoard };
}

function ScreenController() {
    const playerOneName = prompt("What's player one's name?", "Player One");
    const playerTwoName = prompt("What's player two's name?", "Player Two");
    const game = Gamecontroller(playerOneName, playerTwoName);
    const playerTurnDiv = document.querySelector(".turn");
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.getName()}'s turn...`;

        board.forEach((row,rowIndex) => {
            row.forEach((cell,colIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.col = colIndex;
                cellButton.textContent = cell.getValue() === 0 ? "" : cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        })
    };

    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.col;
        const selectedRow = e.target.dataset.row;

        if(!selectedColumn || !selectedRow) return;

        game.playRound(selectedRow,selectedColumn);
        updateScreen();
    };

    boardDiv.addEventListener("click", clickHandlerBoard);

    updateScreen();
}

const GameHandler = (() => {
    const startButton = document.querySelector(".start-button");

    function clickHandlerStartButton() {
        startButton.textContent = "Restart Game";
        ScreenController();
    }
    startButton.addEventListener("click", clickHandlerStartButton);
})();