"use strict";

// Creates HTML-DOM table object
let gameBoard = document.getElementById("gameBoard");

// Hard coded initialisation of start variable --> false= dead, true = alive // 2D array-matrix
let start = [
  [true, false, true, false, false, false, false, false],
  [false, true, true, false, false, false, false, false],
  [false, true, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, true, false, true, false, false],
  [false, false, false, false, true, true, false, false],
  [false, false, false, false, true, false, false, false],
  [false, false, false, false, false, false, false, false],
];

// renders table element "gameBoard"
const showCycle = function () {
  // while gameBoard as child elements, child elements will be removed --> needed to rerender after first updateCycle
  while (gameBoard.firstChild) {
    gameBoard.firstChild.remove();
  }
  // iterates through start array matrix
  for (let i = 0; i < start.length; i++) {
    // number of arrays in start array defines number of table rows
    let tRow = document.createElement("tr");
    for (let j = 0; j < start[i].length; j++) {
      // number of elements inside arrays of array defines number of cells inside the rows --> each cell gets i and j coordinate === defined position
      let tCell = document.createElement("td");
      // checks value of each cell via its specific i and j coordinate
      if (start[i][j]) {
        // if value of cell at position i,j is true, append a class attribute named cell alive --> css classes are set as class attribute to cell
        tCell.setAttribute("class", "cell alive");
        tRow.appendChild(tCell); // the row element gets child element of cell
      } else {
        // if value of cell at position i,j is false, append a class attribute named cell dead
        tCell.setAttribute("class", "cell dead");
        tRow.appendChild(tCell);
      }
    }
    // after one row is filled with cells, product is appended as child to gameBoard element. Iteration through next array(row) starts
    gameBoard.appendChild(tRow);
  }
};

// method updates start array, depending on applied conditions(=rules)
const updateCycle = function () {
  // copy of 2D array (=== nested array)
  let startUpdate = JSON.parse(JSON.stringify(start));
  // iteration through array
  for (let i = 0; i < start.length; i++) {
    for (let j = 0; j < start[i].length; j++) {
      //   conditions to change values of 2d array at position i,j;
      console.log(i, j);
      if (start[i][j]) {
        // if value at position i,j is true, check following coditions
        if (findNeighbours(i, j) === 2 || findNeighbours(i, j) === 3) {
          startUpdate[i][j] = true; // set value at position i,j to true
        } else {
          startUpdate[i][j] = false;
        }
      } else if (findNeighbours(i, j) === 3) {
        // if value at position i,j is false, check given condition
        startUpdate[i][j] = true;
      } else {
        // if value at position i,j is false and else if does not apply, check given condition
        startUpdate[i][j] = false;
      }
    }
  }
  // update start array --> start = startUpdate
  start = JSON.parse(JSON.stringify(startUpdate));
};

// count number of neighbouring cells with value true
const findNeighbours = function (n, m) {
  let counter = 0;
  for (let i = n - 1; i <= n + 1; i++) {
    if (i < 0 || i >= start.length) {
      continue;
    }
    for (let j = m - 1; j <= m + 1; j++) {
      if (j < 0 || j >= start[i].length) {
        continue;
      }
      if (i === n && j === m) {
      } else if (start[i][j]) {
        counter++;
      }
    }
  }
  //   }
  // returned counter will be used in updateCycle to check conditions
  return counter;
};

showCycle();
// method to use on button click
const next = function () {
  updateCycle();
  showCycle();
};

/////////////////////////////////////////////////////
//ToDo:
//previousCycle
//dynamic cell selection
//timer - start and stop?
//apperance

/////////////////////////////////////////////////////
// unfinished timer function
// function x() {
//   setTimeout(() => {
//     console.log("x " + d);
//     d++;
//     showCycle();
//     updateCycle();
//   }, 1000);
// }
// let d = 0;
// function blub() {
//   for (let i = 0; i < 10; i++) {
//     // setTimeout(x, 3000);
//     x();
//     // setTimeout(showCycle(), 1000);
//     // setTimeout(updateCycle, 1500);
//     // console.log(i);
//   }
// }

// // blub();
