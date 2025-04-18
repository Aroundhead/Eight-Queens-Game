// ------------------ Settings Module ------------------
const Settings = (() => {
    let currentQueenImage = 'reina1.png';
    let currentBoardColor = '#b58863';

    function setQueenImage(imageName) {
        currentQueenImage = imageName;
    }

    function getCurrentQueenImage() {
        return currentQueenImage;
    }

    function setBoardColor(color) {
        currentBoardColor = color;
        repaintBoard();
    }

    function getCurrentBoardColor() {
        return currentBoardColor;
    }

    function repaintBoard() {
        const board = document.getElementById('chessBoard');
        if (!board) return;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = board.rows[row].cells[col];
                cell.style.backgroundColor = (row + col) % 2 === 0 ? '#ffffff' : currentBoardColor;
            }
        }
    }

    return {
        setQueenImage,
        getCurrentQueenImage,
        setBoardColor,
        getCurrentBoardColor,
    };
})();

// ------------------ Utils Module ------------------
const Utils = (() => {
    function setCellColor(cell, color) {
        cell.style.backgroundColor = color;
    }

    function clearCell(cell) {
        cell.style.backgroundColor = '';
        cell.style.backgroundImage = '';
    }

    function getBoard() {
        return document.getElementById('chessBoard');
    }

    return {
        setCellColor,
        clearCell,
        getBoard,
    };
})();

// ------------------ Queen Module ------------------
const Queen = (() => {
    let queensPlaced = 0;
    const totalQueens = 8;

    function placeQueen(cell) {
        if (queensPlaced >= totalQueens) return;

        const image = Settings.getCurrentQueenImage();
        cell.style.backgroundImage = `url(./img/${image})`;
        cell.style.backgroundSize = 'cover';
        cell.removeEventListener('click', handleCellClick);

        blockAttacks(cell);
        queensPlaced++;
        updateQueenCounter(); 
        checkWin();
    }
    function updateQueenCounter() {
        const counter = document.getElementById('queenCounter');
        counter.textContent = `Reinas restantes: ${totalQueens - queensPlaced}`;
    }


    function recalculateAttacks() {
        const board = Utils.getBoard();
        for (let row of board.rows) {
            for (let cell of row.cells) {
                if (cell.style.backgroundImage) {
                    blockAttacks(cell);
                }
            }
        }
    }




    function clearAllAttacks() {
        const board = Utils.getBoard();
        for (let row of board.rows) {
            for (let cell of row.cells) {
                cell.classList.remove('attack');
                cell.addEventListener('click', handleCellClick); // reactiva el click
                const rowIdx = parseInt(cell.dataset.row);
                const colIdx = parseInt(cell.dataset.col);
                // Repinta fondo normal del tablero (ajedrez)
                cell.style.backgroundColor = (rowIdx + colIdx) % 2 === 0 ? '#ffffff' : Settings.getCurrentBoardColor();
            }
        }
    }

    function removeQueen(cell) {
        cell.style.backgroundImage = '';
        cell.classList.remove('attack');
        queensPlaced--;
        updateQueenCounter();
        clearAllAttacks();
        recalculateAttacks();
    }
    function resetGameState() {
        queensPlaced = 0;
        updateQueenCounter();
    }

    function blockAttacks(cell) {
        const board = Utils.getBoard();
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        for (let i = 0; i < 8; i++) {
            if (i !== col) markCellAsBlocked(board.rows[row].cells[i]);
            if (i !== row) markCellAsBlocked(board.rows[i].cells[col]);
        }

        for (let i = -7; i <= 7; i++) {
            if (row + i >= 0 && row + i < 8 && col + i >= 0 && col + i < 8 && i !== 0)
                markCellAsBlocked(board.rows[row + i].cells[col + i]);
            if (row + i >= 0 && row + i < 8 && col - i >= 0 && col - i < 8 && i !== 0)
                markCellAsBlocked(board.rows[row + i].cells[col - i]);
        }
    }

    function markCellAsBlocked(cell) {
        if (!cell.style.backgroundImage) { // Si no tiene reina
            cell.removeEventListener('click', handleCellClick);
            cell.classList.add('attack');
        }
    }
    function disableCell(cell) {
        if (!cell.style.backgroundImage) {
            cell.removeEventListener('click', handleCellClick);
            Utils.setCellColor(cell, '#ff8888');
        }
    }

    function unblockBoard() {
        const board = Utils.getBoard();
        for (let row of board.rows) {
            for (let cell of row.cells) {
                if (!cell.style.backgroundImage) {
                    Utils.clearCell(cell);
                    cell.addEventListener('click', handleCellClick);
                }
            }
        }
    }

    function handleCellClick(event) {
        placeQueen(event.target);
    }

    function checkWin() {
        if (queensPlaced === totalQueens) {
            setTimeout(() => {
                showModal();
            }, 100);
        }
    }

    function showModal() {
        const modal = document.getElementById('winModal');
        modal.style.display = 'block';
    }

    document.addEventListener('DOMContentLoaded', () => {
        const closeModalBtn = document.getElementById('closeModal');
        closeModalBtn.addEventListener('click', () => {
            document.getElementById('winModal').style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            const modal = document.getElementById('winModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    return {
        placeQueen,
        removeQueen,
        resetGameState,
    };
})();

// ------------------ Board Module ------------------
const Board = (() => {
    const boardContainer = document.getElementById('boardContainer');
    let boardElement;

    function createBoard() {
        boardElement = document.createElement('table');
        boardElement.id = 'chessBoard';

        for (let row = 0; row < 8; row++) {
            const tr = document.createElement('tr');
            for (let col = 0; col < 8; col++) {
                const td = document.createElement('td');
                td.dataset.row = row;
                td.dataset.col = col;
                td.addEventListener('click', handleCellClick);
                tr.appendChild(td);
            }
            boardElement.appendChild(tr);
        }

        boardContainer.innerHTML = '';
        boardContainer.appendChild(boardElement);

        paintBoard();
    }

    function handleCellClick(event) {
        const cell = event.target;

        // Si la celda está bloqueada, ignorar el click
        if (cell.classList.contains('attack')) {
            return;
        }

        if (cell.style.backgroundImage) {
            Queen.removeQueen(cell);
        } else {
            Queen.placeQueen(cell);
        }
    }

    function resetBoard() {
        if (boardElement) {
            for (let row of boardElement.rows) {
                for (let cell of row.cells) {
                    cell.style.backgroundImage = '';
                    cell.style.backgroundColor = '';
                    cell.classList.remove('attack'); // <--- limpia la clase roja
                    cell.removeEventListener('click', handleCellClick); // <--- limpia eventos anteriores
                    cell.addEventListener('click', handleCellClick); // <--- vuelve a poner click limpio
                }
            }
        }
        Queen.resetGameState();
        paintBoard();
    }

    function paintBoard() {
        const color = Settings.getCurrentBoardColor();
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = boardElement.rows[row].cells[col];
                cell.style.backgroundColor = (row + col) % 2 === 0 ? '#ffffff' : color;
            }
        }
    }

    return {
        createBoard,
        resetBoard,
    };
})();

// ------------------ Solutions Module ------------------
const Solutions = (() => {
    function loadSolution(solutionNumber) {
        const board = Utils.getBoard();
        if (!board) return;

        const solutions = {
            '1': [[0, 3], [1, 6], [2, 2], [3, 7], [4, 1], [5, 4], [6, 0], [7, 5]],
            '2': [[0, 4], [1, 1], [2, 3], [3, 6], [4, 2], [5, 7], [6, 5], [7, 0]],
            '3': [[0, 3], [1, 1], [2, 6], [3, 2], [4, 5], [5, 7], [6, 4], [7, 0]]
        };

        const selectedSolution = solutions[solutionNumber];
        if (!selectedSolution) {
            alert('Solución no disponible');
            return;
        }

        selectedSolution.forEach(([row, col]) => {
            const cell = board.rows[row].cells[col];
            Queen.placeQueen(cell);
        });
    }

    return {
        loadSolution,
    };
})();

// ------------------ Main Script ------------------
document.addEventListener('DOMContentLoaded', () => {
    Board.createBoard();

    document.getElementById('btnReset').addEventListener('click', () => {
        Board.resetBoard();
    });

    document.getElementById('queenImageSelector').addEventListener('change', (event) => {
        Settings.setQueenImage(event.target.value);
    });

    document.getElementById('boardColorSelector').addEventListener('change', (event) => {
        Settings.setBoardColor(event.target.value);
    });
    // 🔥 Nuevo: también para el color picker
    document.getElementById('boardColorPicker').addEventListener('input', (event) => {
        Settings.setBoardColor(event.target.value);
    });

    document.getElementById('solutionSelector').addEventListener('change', (event) => {
        const selected = event.target.value;
        if (selected) {
            Board.resetBoard();
            Solutions.loadSolution(selected);
        }
    });
});
