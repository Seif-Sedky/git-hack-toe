
/* when start game display = none added to form and removed from gameplay-buttons
and vice versa when change names is clicked, you could add anmation before display:none; but effort   */

/* when someone wins, make all his cells winner */

/* when change name restart grid and make it unclickable again */






function GridManager() {
    const gameDimensions = 3;
    let grid = [gameDimensions][gameDimensions];

    function playMove(i, j, c) {
        grid[i][j] = c;
    }

    function resetMoves() {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                grid[i][j] = null;
            }
        }
    }

    function checkDraw(grid) {

        const filled = (arr) => arr.every((val) => val);
        for (let i = 0; i < gameDimensions; i++) {
            if (!filled(grid[1])) {
                return false;
            }
        }
        return true;

    }


    function checkWin(grid) {


        //check rows
        for (let i = 0; i < size; i++) {
            if (allEqual(grid[i]))
                return true;
        }

        //check columns
        for (let i = 0; i < size; i++) {
            const column = grid.map((row) => row[i]);
            if (allEqual(column))
                return true;
        }


        //check diagonal
        const diag = grid.map((row, i) => row[i]);
        if (allEqual(diag))
            return true;


        //check anti diagonal 
        const antiDiag = grid.map((row, i) => row[(size - i) - 1]);
        if (allEqual(antiDiag))
            return true;

        return false;

    }

}

function DisplayManager() {
    let gameStarted = false;

    function playMove() {

    }

    function resetMoves() {

    }

    function showWin() {

    }
}

function gameManager() {
}

function eventManager() {
    let p1 = "Player I";
    let p2 = "Player II";

    const startGame = () => { };

    const endGame = () => {

    };

    const resetGame = () => {
        endGame();
        startGame();
    };

    const changeNames = () => { };

}


function domManager{
    let startBtn = document.querySelector(".start-game");
    let form = document.querySelector(".form");

    let restartBtn = document.querySelector(".restart-btn");
    let changeBtn = document.querySelector(".change-btn");


    let grid = document.querySelector(".grid");

}