// Initial Prompt to Grab Names
var player1Name = prompt("Player 1, Enter your Name");
var player2Name = prompt("Player 2, Enter your Name");

// Initialize Game Object with properties and methods
var gameObj = {
  // State
  playerGrid: [],
  currentTurn: player1Name,
  DOMGameBoard: document.getElementById("game-board"),
  DomTurnHeading: document.getElementById("player-turn"),
  numOfSquares: parseInt(prompt("Enter number of squares")),
  player1Name,
  player2Name,
  turnValues: {
    [this.player1Name]: 1,
    [this.player2Name]: -1,
  },
  playerIcon: {
    [this.player1Name]: "circle",
    [this.player2Name]: "cross",
  },
  //Methods
  initialize: function () {
    this.DomTurnHeading.innerText = gameObj.currentTurn + "'s Turn";
    this.insertSquares(this.numOfSquares);
    this.DOMGameBoard.addEventListener("click", this.handleClicks);
  },
  insertSquares: function (numOfSquares) {
    for (i = 0; i < numOfSquares; i++) {
      let row = [];
      for (j = 0; j < numOfSquares; j++) {
        row.push(0);
        let square = document.createElement("div");
        square.style.height = `calc(100%/${numOfSquares})`;
        square.style.width = `calc(100%/${numOfSquares})`;
        square.style.border = "2px solid purple";
        square.classList.add("unselected-square");
        square.id = i + "," + j;
        this.DOMGameBoard.appendChild(square);
      }
      this.playerGrid.push(row);
    }
  },
  handleClicks: function (event) {
    event.stopPropagation();
    let square = event.target;
    if (!square.classList.value.includes("unselected-square")) {
      console.log("Pick Another");
      return;
    }
    square.classList.remove("unselected-square");
    square.classList.add(gameObj.playerIcon[gameObj.currentTurn]);
    let coord = square.id.split(",");
    gameObj.updateGrid(coord[0], coord[1]);
    gameObj.checkWinner();
    gameObj.updateTurn();
  },
  updateTurn: function () {
    gameObj.currentTurn =
      gameObj.currentTurn === gameObj.player1Name
        ? gameObj.player2Name
        : gameObj.player1Name;
    this.DomTurnHeading.innerText = gameObj.currentTurn + "'s Turn";
  },
  updateGrid: function (row, column) {
    gameObj.playerGrid[row][column] = gameObj.turnValues[gameObj.currentTurn];
  },
  checkWinner: function () {
    for (i = 0; i < 3; i++) {
      let rowSum = 0;
      let columnSum = 0;
      console.log(gameObj.playerGrid);
      for (j = 0; j < 3; j++) {
        rowSum += gameObj.playerGrid[i][j];
        columnSum += gameObj.playerGrid[j][i];
      }
      console.log(rowSum, columnSum);
      if (rowSum == 3 || columnSum == 3) {
        console.log("Player 1 Wins");
      } else if (rowSum == -3 || columnSum == -3) {
        console.log("Player 2 Wins");
      }
    }
  },
};

gameObj.initialize();

// insertSquares();
// console.log(playerGrid);
// gameBoard.onclick = handleClicks;

// // Function
// // Create Grid - To add a twist, allow player to enter what grid size they want, 3x3, 4x4 or 5x5
// // Create nested for loop to add squares to the gameboard
// // Each will have their own index as an id representing an element in the Game Grid. 0,0 will be the top left
// // PlayerGrid will be created during this function since the array is dependent on the layout of the grid
// function insertSquares(numOfSquares = 5) {
//   console.log("Squares Loaded");
//   for (i = 0; i < numOfSquares; i++) {
//     let row = [];
//     for (j = 0; j < numOfSquares; j++) {
//       row.push(0);
//       let square = document.createElement("div");
//       square.style.height = `calc(100%/${numOfSquares})`;
//       square.style.width = `calc(100%/${numOfSquares})`;
//       square.style.border = "2px solid purple";
//       square.classList.add("unselected-square");
//       square.id = i + "," + j;
//       gameBoard.appendChild(square);
//     }
//     playerGrid.push(row);
//   }
// }

// // Function
// // Event Handler for Clicks
// // Apply on gameboard and listen for events to bubble up
// // Once a div is clicked, it's class will change depending on who's turn.
// // ID of the div is extracted to update the playerGrid
// // Call function to check if player has won
// // If no one won, change turn
// function handleClicks(event) {
//   event.stopPropagation();
//   let square = event.target;
//   if (!square.classList.value.includes("unselected-square")) {
//     console.log("Pick Another");
//     return;
//   }
//   console.log(typeof square.classList.value);
//   square.classList.remove("unselected-square");
//   square.classList.add(playerIcon[this.currentTurn]);
//   let coord = square.id.split(",");
//   updateGrid(coord[0], coord[1]);
//   checkWinner();
//   this.currentTurn = updateTurn(this.currentTurn);
// }

// function updateGrid(row, column) {
//   playerGrid[row][column] = turnValues[this.currentTurn];
//   console.log(playerGrid);
// }

// // Function
// // Update playerturn
// function updateTurn(currentPlayer) {
//   let newPlayer = currentPlayer == "Player 1" ? "Player 2" : "Player 1";
//   turnHeading = document.getElementById("player-turn");
//   turnHeading.innerText = newPlayer + " Turn";
//   return newPlayer;
// }

// // Funcution
// // Check if there is a winner
// // Go through grid and perform math operator to see if any row or column has a product of 1
// // Check Diagonal Conditions as well
// function checkWinner() {
//   for (i = 0; i < 3; i++) {
//     let rowSum = 0;
//     let columnSum = 0;
//     for (j = 0; j < 3; j++) {
//       rowSum += playerGrid[i][j];
//       columnSum += playerGrid[j][i];
//     }
//     console.log(rowSum, columnSum);
//     if (rowSum == 3 || columnSum == 3) {
//       console.log("Player 1 Wins");
//     } else if (rowSum == -3 || columnSum == -3) {
//       console.log("Player 2 Wins");
//     }
//   }
// }

// insertSquares();
// console.log(playerGrid);
// gameBoard.onclick = handleClicks;
