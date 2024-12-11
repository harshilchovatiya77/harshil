document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const restartButton = document.getElementById("restartButton");
    let cells = Array.from(document.querySelectorAll(".cell"));
    let currentPlayer = "X";
    let gameState = Array(9).fill(null);

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellClick = (e) => {
        const cell = e.target;
        const index = cell.getAttribute("data-index");

        if (gameState[index] || checkWin()) {
            return;
        }

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            status.textContent = `Player ${currentPlayer} Wins!`;
            return;
        } else if (gameState.every(cell => cell)) {
            status.textContent = "It's a Tie!";
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `Player ${currentPlayer}'s Turn`;

        if (currentPlayer === "O") {
            setTimeout(handleAIMove, 500);  // AI makes a move after 500ms
        }
    };

    const handleAIMove = () => {
        let emptyCells = gameState.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
        if (emptyCells.length > 0) {
            let aiMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            gameState[aiMove] = currentPlayer;
            cells[aiMove].textContent = currentPlayer;

            if (checkWin()) {
                status.textContent = `Player ${currentPlayer} Wins!`;
                return;
            } else if (gameState.every(cell => cell)) {
                status.textContent = "It's a Tie!";
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s Turn`;
        }
    };

    const checkWin = () => {
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });
    };

    const restartGame = () => {
        gameState.fill(null);
        cells.forEach(cell => cell.textContent = "");
        currentPlayer = "X";
        status.textContent = `Player ${currentPlayer}'s Turn`;
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", restartGame);

    status.textContent = `Player ${currentPlayer}'s Turn`;
});
