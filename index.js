const grid = new Array(9).fill(0).map(() => new Array(9).fill(0));

function solve() {
    // Sudoku solving logic (same as before)
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) {
                for (let k = 1; k <= 9; k++) {
                    grid[i][j] = k;
                    if (isValid(i, j) && solve()) {
                        return true;
                    }
                    grid[i][j] = 0;
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(i, j) {
    // Validation logic (same as before)
    for (let k = 0; k < 9; k++) {
        if (k !== j && grid[i][k] === grid[i][j]) {
            return false;
        }
    }
    for (let k = 0; k < 9; k++) {
        if (k !== i && grid[k][j] === grid[i][j]) {
            return false;
        }
    }
    const startRow = Math.floor(i / 3) * 3;
    const startCol = Math.floor(j / 3) * 3;
    for (let k = startRow; k < startRow + 3; k++) {
        for (let l = startCol; l < startCol + 3; l++) {
            if ((k !== i || l !== j) && grid[k][l] === grid[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function printGrid() {
    // Printing grid logic (same as before)
    const solutionDiv = document.getElementById('solution');
    const table = document.createElement('table');
    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            cell.textContent = grid[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    solutionDiv.appendChild(table);
}

function createSudokuGrid() {
    const table = document.getElementById('sudoku-grid');
    for (let i = 0; i < 9; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '0';
            input.max = '9';
            input.value = '0';
            input.dataset.row = i;
            input.dataset.col = j;
            input.addEventListener('change', () => {
                grid[i][j] = parseInt(input.value) || 0;
            });
            cell.appendChild(input);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

function displaySolution() {
    const solutionDiv = document.getElementById('solution');
    solutionDiv.innerHTML = ''; // Clear previous solution
    if (solve()) {
        const solutionHeader = document.createElement('h2');
        solutionHeader.textContent = "The Sudoku grid has been solved 🎊🎊🎊";
        solutionDiv.appendChild(solutionHeader);
        printGrid(solutionDiv);
    } else {
        const unableMsg = document.createElement('p');
        unableMsg.textContent = "Unable to solve the Sudoku grid.";
        solutionDiv.appendChild(unableMsg);
    }
}

window.onload = () => {
    createSudokuGrid();
    const solveButton = document.getElementById('solve-button');
    solveButton.addEventListener('click', displaySolution);
};
