//create array based on ints ("1"-"9" with "-1" being a special placeholder for empty cells)
const numbers = [-1, -1, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9];

//Add code to the `sudoku.js` file that will dynamically build the game board
// 1 2 3 4 5 6 7 8 9    2 x 1 = 9, do per row, check content of column. per item pop except for -1
// 1 2 3 4 5 6 7 8 9
// 1 2 3 4 5 6 7 8 9
// 1 2 3 4 5 6 7 8 9
// 1 2 3 4 5 6 7 8 9
// 1 2 3 4 5 6 7 8 9

// create rand int, check all rows in the same column if number exists,
// if it exist create new rand int, go back
// if it doesn't assing int, pop num out of permanent list and move on.
function assign_table() {
  let matrix = [[], [], [], [], [], [], [], [], []];
  let cols = 9;
  let flag = false;
  let otherflag = false;

  for (var i = 0; i < cols; i++) {
    for (var x = 0; x < cols; x++) {
      var number = randnums();
      var a = i - 1;
      if (matrix[i].indexOf(number) != -1) {
        number = randnums();
        x = x - 1;
      }

      if (i > 0) {
        for (var z = 0; z < a; z++) {
          if (matrix[z][x] == number && matrix[z][x] != -1 && z > 0) {
            console.log("before: ", z);
            console.log("Number: ", number);
            console.log("matrixr: ", matrix[z][x]);
            console.log("row: ", i);
            console.log("col: ", x);
            number = randnums();
            z = z - 1;
            console.log("after: ", z);
          }
        }
      }

      matrix[i][x] = number;
    }
  }
  //   const index = matrix.indexOf(1);
  //   console.log(index);
  return matrix;
}

function randnums() {
  let randomItem = numbers[Math.floor(Math.random() * numbers.length)];
  return randomItem;
}

console.log(assign_table());
