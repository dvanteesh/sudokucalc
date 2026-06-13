const grid = document.getElementById("grid");

for (let row = 0; row < 9; row++) {

    for (let col = 0; col < 9; col++) {

        const input = document.createElement("input");

        input.type = "number";

        input.min = 1;
        input.max = 9;

        input.id = `${row}-${col}`;    

        input.addEventListener("input", () => {

            input.value = input.value.slice(0,1);
            const board = getBoard();

            const num = Number(input.value);

            board[row][col] = 0;

            if (input.value !== "" && !isValid(board, row, col, num)) {

                 input.value = "";

                    alert("That number already exists in this row, column, or box.");

    return;
}
            if (input.value < 1 || input.value > 9){
                input.value = "";
            }
            if (input.value !== ""){
                
                if(col < 8){

                    document
                    .getElementById(`${row}-${col + 1}`)
                    .focus();

                } else if (row < 8){

                    document
                    .getElementById(`${row + 1}-0`)
                    .focus();
                }
            }
        }
        );

        if (col === 2 || col === 5 || col === 8) {
            input.style.borderRight = "5px solid black";
        }

        if (row === 2 || row === 5 || row === 8) {
            input.style.borderBottom = "5px solid black";
        }

        grid.appendChild(input);
        input.style.animationDelay = `${(row * 9 + col) * 0.05}s`;
    }   
}

function getBoard() {

    const board = [];

    for (let row = 0; row < 9; row++) {

        const currentRow = [];

        for (let col = 0; col < 9; col++) {

            const value =
                document.getElementById(`${row}-${col}`).value;

            currentRow.push(value === "" ? 0 : Number(value));
        }

        board.push(currentRow);
    }

    return board;
}

function isValid(board, row, col, num) {

    for (let i = 0; i < 9; i++) {

        if (board[row][i] === num) {
            return false;
        }

        if (board[i][col] === num) {
            return false;
        }
    }

    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let r = boxRow; r < boxRow + 3; r++) {

        for (let c = boxCol; c < boxCol + 3; c++) {

            if (board[r][c] === num) {
                return false;
            }
        }
    }

    return true;
}

function findEmpty(board) {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }

    return null;
}

function solve(board) {

    const empty = findEmpty(board);

    if (empty === null) {
        return true;
    }

    const row = empty[0];
    const col = empty[1];

    for (let num = 1; num <= 9; num++) {

        if (isValid(board, row, col, num)) {

            board[row][col] = num;

            if (solve(board)) {
                return true;
            }

            board[row][col] = 0;
        }
    }

    return false;
}

function displayBoard(board) {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            document.getElementById(`${row}-${col}`).value =
                board[row][col];
        }
    }
}
document
.getElementById("solveBtn")
.addEventListener("click", () => {

    const board = getBoard();

    if (solve(board)) {

        displayBoard(board);

    } else {

        alert("No solution exists.");
    }
});
document
.getElementById("clearBtn")
.addEventListener("click", () => {

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            document.getElementById(`${row}-${col}`).value = "";
        }
    }
});