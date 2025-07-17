
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


    const startGame = () => { };

    const endGame = () => {

    };

    const resetGame = () => {
        endGame();
        startGame();
    };

    const changeNames = () => { };

}

function Player(name) {
    let player = name;
    const getPlayerName = function () {
        return name;
    }
    const setPlayerName = function (newName) {
        name = newName;
    }
}


function domManager() {

    let form = document.querySelector(".form");
    let restartBtn = document.querySelector(".restart-btn");
    let changeBtn = document.querySelector(".change-btn");
    let grid = document.querySelector(".grid");
    let gameplayButtons = document.querySelector(".gameplay-buttons");


    let gameStarted = false;
    let playerOne;
    let playerTwo;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        let player1 = formData.get('player1');
        let player2 = formData.get('player2');
        playerOne = Player(player1);
        playerTwo = Player(player2);

        gameStarted = true;
        form.style.display = "none";
        gameplayButtons.style.display = "flex";

        form.reset();
    });

}

domManager();
