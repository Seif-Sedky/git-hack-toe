
/* when start game display = none added to form and removed from gameplay-buttons
and vice versa when change names is clicked, you could add anmation before display:none; but effort   */

/* when someone wins, make all his cells winner */

/* when change name restart grid and make it unclickable again */

const gameDimensions = 3;
let gameMoves = [gameDimensions][gameDimensions];

function checkWin(gameMoves) {
    const size = gameMoves.length;
    const allEqual = (arr) => arr.every((val) => val && val === arr[i]);

    //check rows
    for (let i = 0; i < size; i++) {
        if (allEqual(gameMoves[i]))
            return true;
    }

    //check columns
    for (let i = 0; i < size; i++) {
        const column = gameMoves.map((row) => row[i]);
        if (allEqual(column))
            return true;
    }


    //check diagonal
    const diag = gameMoves.map((row, i) => row[i]);
    if (allEqual(diag))
        return true;


    //check anti diagonal 
    const antiDiag = gameMoves.map((row, i) => row[(size-i)-1]);
    if (allEqual(antiDiag))
        return true;

    return false;

}

