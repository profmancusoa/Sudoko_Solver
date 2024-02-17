function sudokuSolver(matrix) {
    if (solveSudoku(matrix) === true) {
      return matrix;
    }
    return 'NO SOLUTION EXISTS!';
  }

  const UNASSIGNED = 0;

function solveSudoku(matrix) {
  let row = 0;
  let col = 0;
  let checkBlankSpaces = false;

  print_sudoko(matrix);
  
uscita: for (row = 0; row < matrix.length; row++) { // {1}
    for (col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === UNASSIGNED) {
        checkBlankSpaces = true; // {2}
        break uscita;
      }
    }
  }
  if (checkBlankSpaces === false) {
    return true; // {4}
  } 
  
  for (let num = 1; num <= 9; num++) { // {5}
    
    if (isSafe(matrix, row, col, num)) { // {6}
      
      matrix[row][col] = num; // {7}
      
      if (solveSudoku(matrix)) { // {8}
        return true;
      }
      
      matrix[row][col] = UNASSIGNED; // {9}
    }
  }
  return false; // {10}
}

function isSafe(matrix, row, col, num) {
    return (
      !usedInRow(matrix, row, num) &&
      !usedInCol(matrix, col, num) &&
      !usedInBox(matrix, row - (row % 3), col - (col % 3), num)
    );
  }

  function usedInRow(matrix, row, num) {
    for (let col = 0; col < matrix.length; col++) { // {11}
      if (matrix[row][col] === num) {
        return true;
      }
    }
    return false;
  }
  
  function usedInCol(matrix, col, num) {
    for (let row = 0; row < matrix.length; row++) { // {12}
      if (matrix[row][col] === num) {
        return true;
      }
    }
    return false;
  }
  
  function usedInBox(matrix, boxStartRow, boxStartCol, num) { 
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (matrix[row + boxStartRow][col + boxStartCol] === num) { // {13}
          return true;
        }
      }
    }
    return false;
  }

function print_sudoko(matrix) {
    for(let r = 0; r < matrix.length; r++) {
        for(let c = 0; c < matrix.length; c++) {
            process.stdout.write(String(matrix[r][c]) + ' ');
        }
        console.log();
    }
}
  const sudokuGrid = [
    [5, 4, 9, 0, 0, 0, 0, 0, 0],
    [0, 7, 2, 9, 0, 4, 0, 0, 0],
    [8, 0, 1, 0, 0, 0, 6, 4, 0],
    [0, 1, 0, 3, 7, 0, 0, 6, 0],
    [0, 0, 0, 4, 0, 9, 1, 0, 0],
    [0, 2, 0, 5, 6, 0, 3, 7, 0],
    [0, 0, 6, 7, 0, 5, 0, 1, 8],
    [2, 8, 0, 1, 9, 6, 7, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 9, 6]
  ];

  print_sudoko(sudokuSolver(sudokuGrid));


  



  