// Initialize Game Object with properties and methods
console.log("reinit");
var gameObj = {
  // State
  playerGrid: [],
  gameStatus: "Ongoing",
  currentPlayer: "player1",
  DOMGameBoard: undefined,
  DOMTurnHeading: undefined,
  numOfSquares: 0,
  numOfTurns: 0,
  player1: {
    name: undefined,
    turnValue: 1,
    playerIcon: "circle",
  },
  player2: {
    name: undefined,
    turnValue: -1,
    playerIcon: "cross",
  },
  //Methods
  initializeGame: function () {
    document.querySelector("#game-menu button").onclick = gameObj.inputSettings;
    gameObj.initializeState();
  },
  inputSettings: function (event) {
    console.log("hi");
    event.preventDefault();
    gameObj.player1.name = document.querySelector("#player1-name").value
      ? document.querySelector("#player1-name").value
      : "Player 1";
    gameObj.player2.name = document.querySelector("#player2-name").value
      ? document.querySelector("#player2-name").value
      : "Player 2";
    gameObj.numOfSquares = document.querySelector("#three").checked
      ? 3
      : document.querySelector("#four").checked
      ? 4
      : document.querySelector("#five").checked
      ? 5
      : 3;
    document.querySelector("#game-menu").style.visibility = "hidden";
    document.documentElement.style.setProperty(
      "--background-color",
      "rgba(0,0,0,0.3)"
    );
    gameObj.initializeState();
  },
  initializeState: function () {
    // Setting up state
    gameObj.DOMGameBoard = document.getElementById("game-board");
    gameObj.DOMTurnHeading = document.getElementById("player-turn");
    gameObj.numOfTurns = gameObj.numOfSquares - 2;
    gameObj.playerGrid = gameObj.createGrid(gameObj.numOfSquares);

    // Rendering Heading
    gameObj.renderTurnHeading(gameObj.currentPlayer);

    // Adding Event Listeners
    gameObj.DOMGameBoard.addEventListener("click", gameObj.handleClicks);
    document.getElementById("reset").onclick = gameObj.resets;
  },
  createGrid: function (gridLength) {
    let grid = [];
    for (i = 0; i < gridLength; i++) {
      let row = [];
      for (j = 0; j < gridLength; j++) {
        row.push(0);
        this.renderSquare(i, j);
      }
      grid.push(row);
    }
    return grid;
  },
  renderTurnHeading: (player) =>
    (gameObj.DOMTurnHeading.innerText =
      gameObj[player].name + "'s Turn - " + gameObj.numOfTurns + " move left"),
  renderTieHeading: () =>
    (gameObj.DOMTurnHeading.innerText = "It's a Tie! Restart the game!"),
  renderWinHeading: (player) =>
    (gameObj.DOMTurnHeading.innerText =
      gameObj[player].name + " Won the Game!"),
  renderSquare: function (i, j) {
    let square = document.createElement("div");
    square.style.height = `calc(100%/${gameObj.numOfSquares})`;
    square.style.width = `calc(100%/${gameObj.numOfSquares})`;
    square.style.border = "4px solid 	#08679f";
    square.classList.add("unselected-square");
    square.id = i + "," + j;
    this.DOMGameBoard.appendChild(square);
  },
  reRenderSquare: function (square) {
    square.classList.remove("unselected-square");
    square.classList.add(gameObj[gameObj.currentPlayer].playerIcon);
  },
  resets: function () {
    gameObj.numOfTurns = gameObj.numOfSquares - 2;
    gameObj.renderTurnHeading(gameObj.currentPlayer);
    gameObj.gameStatus = "ongoing";
    gameObj.playerGrid = [];
    for (i = 0; i < gameObj.numOfSquares; i++) {
      let row = [];
      for (j = 0; j < gameObj.numOfSquares; j++) {
        row.push(0);
        let square = document.getElementById(i + "," + j);
        square.classList.remove("cross");
        square.classList.remove("circle");
        square.classList.add("unselected-square");
      }
      gameObj.playerGrid.push(row);
    }
  },
  updateTurn: function () {
    gameObj.numOfTurns = gameObj.numOfSquares - 2;
    gameObj.currentPlayer =
      gameObj.currentPlayer === "player1" ? "player2" : "player1";
    gameObj.renderTurnHeading(gameObj.currentPlayer);
  },
  updateGrid: function (row, column) {
    gameObj.playerGrid[row][column] = gameObj[gameObj.currentPlayer].turnValue;
  },
  updateGameStatus: function () {
    let tieCheck = 1;
    let diagSum1 = 0;
    let diagSum2 = 0;
    for (i = 0; i < gameObj.numOfSquares; i++) {
      let rowSum = 0;
      let columnSum = 0;
      diagSum1 += gameObj.playerGrid[i][i];
      diagSum2 += gameObj.playerGrid[i][gameObj.numOfSquares - i - 1];
      for (j = 0; j < gameObj.numOfSquares; j++) {
        rowSum += gameObj.playerGrid[i][j];
        columnSum += gameObj.playerGrid[j][i];
        tieCheck *= gameObj.playerGrid[j][i];
      }
      if (
        Math.abs(rowSum) == gameObj.numOfSquares ||
        Math.abs(columnSum) == gameObj.numOfSquares ||
        Math.abs(diagSum1) == gameObj.numOfSquares ||
        Math.abs(diagSum2) == gameObj.numOfSquares
      )
        return "win";
    }
    if (tieCheck) return "tie";
    return "ongoing";
  },
  handleClicks: function (event) {
    event.stopPropagation();
    let square = event.target;
    if (
      !square.classList.value.includes("unselected-square") ||
      gameObj.gameStatus == "win"
    )
      return;
    gameObj.reRenderSquare(square);
    let coord = square.id.split(",");
    gameObj.updateGrid(coord[0], coord[1]);
    gameObj.numOfTurns--;
    gameObj.renderTurnHeading(gameObj.currentPlayer);
    gameObj.gameStatus = gameObj.updateGameStatus();
    if (gameObj.gameStatus === "win")
      gameObj.renderWinHeading(gameObj.currentPlayer);
    else if (gameObj.gameStatus === "tie") gameObj.renderTieHeading();
    else if (gameObj.numOfTurns === 0) gameObj.updateTurn();
  },
};

// Initialize Game
gameObj.initializeGame();
