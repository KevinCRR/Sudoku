var clickedValue;
var previousElements = [];
var previousValues = [];
var blockInput = false;
var flag = [];

//user number Palette selection
function ValueSelect(e) {
  clickedValue = e.target.innerText;
}

//assigns values to game board where user clicks
function valueAssign(e) {
  if (clickedValue === undefined) {
  } else if (!(e.target.innerText == "")) {
  } else if (e.target.getElementsByTagName("img").length > 0) {
  } else if (blockInput == false) {
    if (sameNumber(e.target)) {
      blockInput = true;
    }

    previousElements.push(e);
    previousValues.push(e.target.innerText);
    e.target.className = "user-input";
    e.target.innerText = clickedValue;

    clickedValue = undefined;
  }
}

//keep track and allows user to go back to the previous values
function previousValue() {
  if (previousElements.length > 0) {
    previousElements.at(-1).target.innerText = previousValues.at(-1);

    if (blockInput == true) {
      for (var i = 0; i < flag.length; i++) {
        if (flag[i].className == "error-in-input") {
          flag[i].className = "user-input";
        } else {
          flag[i].className = "";
        }
      }
      flag = [];

      blockInput = false;
    }

    previousElements.at(-1).target.className = "";

    previousElements.at(-1).target.className = "";
    previousElements.pop();
    previousValues.pop();
  }
}

//change values from var to let
//could optimize by having loop check for inner block items, if not found just loop through same row and col of other blocks
//maybe seperate row and colm checker from blocker checker?
//maybe have a better naming convention?
function sameNumber(currentCell) {
  //current cell and table values
  let currentCellNumber = currentCell.getAttribute("cell");
  let gametable = document.getElementById("board");
  let currentCellRow = parseInt(currentCellNumber.charAt(0)) - 1;
  let currentCelCol = parseInt(currentCellNumber.charAt(1)) - 1;
  let errorInput = false;

  //row and col checker values
  let Gamerow = gametable.rows[currentCellRow];
  let GameCol;
  let dynamicRow;
  let staticCol;

  //block checker values
  let firstRow = Math.floor(currentCellRow / 3) * 3;
  let firstCol = Math.floor(currentCelCol / 3) * 3;
  let lastRow = firstRow + 3;
  let lastCol = firstCol + 3;
  let blockRow;
  let blockCol;

  //col and row checker
  for (var i = 0; i < 9; i++) {
    dynamicRow = gametable.rows[i];
    staticCol = dynamicRow.cells[currentCelCol];
    GameCol = Gamerow.cells[i];
    if (currentCelCol == i) {
    } else if (GameCol.innerText == clickedValue) {
      if (GameCol.className == "user-input") {
        GameCol.className = "error-in-input";
      } else {
        GameCol.className = "error";
      }

      flag.push(GameCol);
      errorInput = true;
    }

    if (currentCellRow == i) {
    } else if (staticCol.innerText == clickedValue) {
      if (staticCol.className == "user-input") {
        staticCol.className = "error-in-input";
      } else {
        staticCol.className = "error";
      }

      flag.push(staticCol);
      errorInput = true;
    }
  }
  //block checker
  for (var i = firstRow; i < lastRow; i++) {
    blockRow = gametable.rows[i];
    for (var x = firstCol; x < lastCol; x++) {
      blockCol = blockRow.cells[x];
      if (currentCellRow == i && currentCelCol == x) {
      } else if (blockCol.innerText == clickedValue) {
        if (blockCol.className == "user-input") {
          blockCol.className = "error-in-input";
        } else {
          blockCol.className = "error";
        }

        flag.push(blockCol);
        errorInput = true;
      }
    }
  }

  return errorInput;
}

function startGame() {
  createNumberPalette();
  createTable();
}

//dynamically creates the gametable
function createTable() {
  let gametable = document.getElementById("board");
  let tableValues = [
    [-1, 1, -1, -1, -1, -1, -1, 9, -1],
    [-1, -1, 4, -1, -1, -1, 2, -1, -1],
    [-1, -1, 8, -1, -1, 5, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, 3, -1],
    [2, -1, -1, -1, 4, -1, 1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, 1, 8, -1, -1, 6, -1, -1],
    [-1, 3, -1, -1, -1, -1, -1, 8, -1],
    [-1, -1, 6, -1, -1, -1, -1, -1, -1],
  ];
  const cols = 9;
  let row = [];
  let cell = [];

  for (var i = 0; i < cols; i++) {
    row[i] = gametable.insertRow(i);
    for (var x = 0; x < cols; x++) {
      let val = String(i + 1) + String(x + 1);
      cell[x] = row[i].insertCell(x);
      if (tableValues[i][x] == -1) {
        cell[x].setAttribute("cell", val);
        cell[x].addEventListener("click", valueAssign);
        cell[x].innerHTML = " ";
      } else {
        cell[x].setAttribute("cell", val);
        cell[x].addEventListener("click", valueAssign);
        cell[x].innerHTML = tableValues[i][x];
      }
    }
  }
}

//dynamically creates the number palette
function createNumberPalette() {
  var palette = document.getElementById("palette");
  let row = palette.insertRow(0);
  const paletteValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, "Back"];
  const paletteRows = 10;
  let col = [];

  for (var i = 0; i < paletteRows; i++) {
    if (i === 9) {
      col[i] = row.insertCell(i);
      col[i].addEventListener("click", previousValue);
      col[i].appendChild(document.createElement("img")).src =
        "./images/undo.png";
    } else {
      col[i] = row.insertCell(i);
      col[i].addEventListener("click", ValueSelect);
      col[i].setAttribute("tabindex", i);
      col[i].innerHTML = paletteValues[i];
    }
  }
}

//dynamically creates scoreboard
function createScoreBoard() {
  var scoreBoard = document.getElementById("Score-board");
  let row;

  const scores = [
    {
      date: "2021/01/17",
      duration: "3:41",
    },
    {
      date: "2021/01/21",
      duration: "4:01",
    },
    {
      date: "2021/02/01",
      duration: "2:52",
    },
    {
      date: "2021/02/17",
      duration: "3:08",
    },
    {
      date: "2021/03/02",
      duration: "2:51",
    },
  ];

  for (score of scores) {
    row = scoreBoard.insertRow(-1);
    dateCol = row.insertCell(-1);
    timeCol = row.insertCell(-1);
    dateCol.innerText = score.date;
    timeCol.innerText = score.duration;
  }
}

// ATTEMPT AT MAKING SELF GENERATING SUDOKU BOARD
//create array based on ints ("1"-"9" with "-1" being a special placeholder for empty cells)
// const numbers = [-1, -1, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// //Add code to the `sudoku.js` file that will dynamically build the game board
// // 1 2 3 4 5 6 7 8 9    2 x 1 = 9, do per row, check content of column. per item pop except for -1
// // 1 2 3 4 5 6 7 8 9
// // 1 2 3 4 5 6 7 8 9
// // 1 2 3 4 5 6 7 8 9
// // 1 2 3 4 5 6 7 8 9
// // 1 2 3 4 5 6 7 8 9

// // create rand int, check all rows in the same column if number exists,
// // if it exist create new rand int, go back
// // if it doesn't assing int, pop num out of permanent list and move on.
// function assign_table() {
//   let matrix = [[], [], [], [], [], [], [], [], []];
//   let cols = 9;
//   let flag = false;
//   let otherflag = false;

//   for (var i = 0; i < cols; i++) {
//     for (var x = 0; x < cols; x++) {
//       var number = randnums();
//       var a = i - 1;
//       if (matrix[i].indexOf(number) != -1) {
//         number = randnums();
//         x = x - 1;
//       }

//       if (i > 0) {
//         for (var z = 0; z < a; z++) {
//           if (matrix[z][x] == number && matrix[z][x] != -1 && z > 0) {
//             console.log("before: ", z);
//             console.log("Number: ", number);
//             console.log("matrixr: ", matrix[z][x]);
//             console.log("row: ", i);
//             console.log("col: ", x);
//             number = randnums();
//             z = z - 1;
//             console.log("after: ", z);
//           }
//         }
//       }

//       matrix[i][x] = number;
//     }
//   }
//   //   const index = matrix.indexOf(1);
//   //   console.log(index);
//   return matrix;
// }

// function randnums() {
//   let randomItem = numbers[Math.floor(Math.random() * numbers.length)];
//   return randomItem;
// }

// console.log(assign_table());
