
/* when start game display = none added to form and removed from gameplay-buttons
and vice versa when change names is clicked, you could add anmation before display:none; but effort   */

/* when someone wins, make all his cells winner */

/* when change name restart grid and make it unclickable again */


function Player(name) {
    let player = name;
    const getPlayerName = function () {
        return name;
    }
    const setPlayerName = function (newName) {
        name = newName;
    }
    return { getPlayerName, setPlayerName };
}


function DomManager() {
    let form = document.querySelector(".form");
    let restartBtn = document.querySelector(".restart-btn");
    let playAgainBtn = document.querySelector(".play-again-btn");
    let grid = document.querySelector(".grid");
    let gameplayButtons = document.querySelector(".gameplay-buttons");
    let winnerP = document.querySelector(".game-winner");
    let title = document.querySelector(".title");

    return { form, restartBtn, playAgainBtn, grid, gameplayButtons, winnerP, title };
}


function GridManager() {
    const gameDimensions = 3;
    let grid = [];
    for (let i = 0; i < gameDimensions; i++) {
        grid[i] = Array(gameDimensions).fill(null);
    }
    function playMove(move, cell) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        grid[row][col] = move;
    }

    function resetMoves() {
        for (let i = 0; i < gameDimensions; i++) {
            grid[i] = Array(gameDimensions).fill(null);
        }
    }

    function checkDraw() {

        const filled = (arr) => arr.every((val) => val);
        for (let i = 0; i < gameDimensions; i++) {
            if (!filled(grid[i])) {
                return false;
            }
        }
        return true;

    }


    function checkWin() {


        const allEqual = (arr) => arr.every((val) => val && val === arr[0]);

        //check rows
        for (let i = 0; i < gameDimensions; i++) {
            if (allEqual(grid[i]))
                return true;
        }

        //check columns
        for (let i = 0; i < gameDimensions; i++) {
            const column = grid.map((row) => row[i]);
            if (allEqual(column))
                return true;
        }


        //check diagonal
        const diag = grid.map((row, i) => row[i]);
        if (allEqual(diag))
            return true;


        //check anti diagonal 
        const antiDiag = grid.map((row, i) => row[(gameDimensions - i) - 1]);
        if (allEqual(antiDiag))
            return true;

        return false;

    }

    return { playMove, resetMoves, checkDraw, checkWin };

}



function DisplayManager() {

    function playMove(move, cell) {

        cell.classList.add(move);
        cell.textContent = move.toUpperCase();

        //note that when adding the class it auto disables the button when clicked again
    }

    function resetMoves(grid) {

        for (const child of grid.children) {
            child.classList.remove("x");
            child.classList.remove("o");
            child.textContent = "";
        }

    }


    return { playMove, resetMoves };
}


function gameEngine() {
    let gameStarted = false;
    let turn = 0;

    let playerOne;
    let playerTwo;

    const domManager = DomManager();
    const displayManager = DisplayManager();
    const gridManager = GridManager();


    domManager.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(domManager.form);

        let player1 = formData.get('player1');
        let player2 = formData.get('player2');

        playerOne = Player(player1);
        playerTwo = Player(player2);

        gameStarted = true;
        domManager.form.style.display = "none";
        domManager.gameplayButtons.style.display = "flex";

        //remove title
        domManager.title.textContent = "";

        domManager.form.reset();


    });


    domManager.grid.addEventListener("click", (e) => {
        if (gameStarted && e.target.classList.contains("cell") && !e.target.classList.contains("x") && !e.target.classList.contains("o")) {




            //get move to be played
            let move = turn % 2 === 0 ? 'x' : 'o'

            //add move in front end
            displayManager.playMove(move, e.target);

            //add move in backend 
            gridManager.playMove(move, e.target);



            //check win
            if (gridManager.checkWin()) {
                //last player that played is the winner
                let winner = turn % 2 === 0 ? playerOne.getPlayerName() : playerTwo.getPlayerName();
                let message = turn % 2 === 0 ? `${winner} strikes through. X marks the win` : `${winner} completes the cycle. O triumphs`;
                domManager.winnerP.textContent = message.toUpperCase();
                gameStarted = false;
            }

            //check tie 
            else if (gridManager.checkDraw()) {
                domManager.winnerP.textContent = `SYMMETRY ACHIEVED, ENTROPY WINS`;
                gameStarted = false;
            }
            //increment turn even if the game ended to switch starting player
            turn++;

        }
    });


    domManager.restartBtn.addEventListener("click", (e) => {
        endGame();
        gameStarted = false;
        domManager.form.style.display = "flex";
        domManager.gameplayButtons.style.display = "";
        playerOne.setPlayerName("Player I");
        playerTwo.setPlayerName("Player II");
        turn = 0;
        domManager.title.textContent = "Git Hack Toe";
    });

    domManager.playAgainBtn.addEventListener("click", (e) => {
        endGame();
        gameStarted = true;
    });

    function endGame() {
        gridManager.resetMoves();
        displayManager.resetMoves(domManager.grid);
        domManager.winnerP.textContent = "";
    }

}

gameEngine();
