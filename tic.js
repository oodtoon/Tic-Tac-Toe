const turn = document.querySelector(".turn");
const restart = document.querySelector(".restart")
const gameboard = document.querySelector("#gameboard");
let playerToGo = "X"
const gameBoardModel = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]


function isRowSame() {
    for (let row = 0; row < gameBoardModel.length; row++) {
        const rows = [gameBoardModel[0][row], gameBoardModel[1][row], gameBoardModel[2][row]]
        if (rows.every(box => box === "X") ||
            rows.every(box => box === "O")) {
            return true;
    }
    return false;
}
};

function isColumnSame() {
    for (let column = 0; column < gameBoardModel.length; column++) {
        if (gameBoardModel[column].every(box => box === "X") ||
            gameBoardModel[column].every(box => box === "O")) {
            return true;
        }
    }
    return false;
}

function isDiaganolSame() {
    if (gameBoardModel[1][1] !== "") {
        return (
            (gameBoardModel[0][0] === gameBoardModel[1][1] && gameBoardModel[0][0] === gameBoardModel[2][2]) ||
            (gameBoardModel[0][2] === gameBoardModel[1][1] && gameBoardModel[0][0] === gameBoardModel[2][0])
        )
    } 

}





function winCheck() {
    console.log(isColumnSame(), isRowSame(), isDiaganolSame())
    if (isColumnSame() ||
        isRowSame() ||
        isDiaganolSame()) {
        if (playerToGo === "O") {
            turn.textContent = "X Wins!"
        }
        else if (playerToGo === "X") {
            turn.textContent = "O Wins!"
        }
        restart.classList.remove("disable");
    }


}

restart.addEventListener("click", function () {
    turn.textContent = "X's Turn!"
    restart.classList.add("disable")
    clear();
    renderGamestate();
});

function clear() {
    for (let column = 0; column < gameBoardModel.length; column++) {
        for (let row = 0; row < gameBoardModel[column].length; row++) {
            gameBoardModel[column][row] = ""
        }
    }
}


function createBox(x, y, character) {
    const element = document.createElement("div"); //allows you to create a new element in HTML and isn't pushed into HTML until you use append method
    element.classList.add("box");
    element.textContent = character;
    element.addEventListener("click", function () {
        updateGameState(x, y);
        winCheck();

    })

    return element;
}

function updateGameState(x, y) {
    if (playerToGo === "X" && gameBoardModel[y][x] === "") {
        const character = "X";
        turn.textContent = "O's Turn"
        playerToGo = "O";
        gameBoardModel[y][x] = character
    } else if (playerToGo === "O" && gameBoardModel[y][x] === "") {
        const character = "O";
        turn.textContent = "X's Turn"
        playerToGo = "X";
        gameBoardModel[y][x] = character


    }

    console.log({ gameBoardModel })
    renderGamestate();
}


function assembleGameboard() {
    let boxes = [];
    for (let y = 0; y < gameBoardModel.length; y++) {
        const row = gameBoardModel[y];
        for (let x = 0; x < row.length; x++) {
            const cell = row[x];
            const box = createBox(x, y, cell);
            boxes.push(box);
        }

    }
    return boxes;
}

function renderGamestate() {
    gameboard.innerHTML = ""
    const boxes = assembleGameboard();
    // boxes = [node1, node2, node3,]
    gameboard.append(...boxes);

}

renderGamestate();