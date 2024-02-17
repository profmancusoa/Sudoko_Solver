<script>
  const EMPTY = 0;
  const BOX_ROW = 3;
  const BOX_COL = 3;
  const BOX_AREA = BOX_ROW * BOX_COL;

  let matrix = Array(BOX_AREA)
    .fill(EMPTY)
    .map((r) => Array(BOX_AREA).fill(EMPTY));

  function validate(r, c, e) {
    if (![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(+e.key))
      matrix[r][c] = EMPTY;
    else 
        matrix[r][c] = +e.key;
    e.preventDefault();
  }

  function sudoku_solver(matrix) {
    if (solve_sudoku(matrix) === true) {
      return matrix;
    }
    return Array(BOX_AREA)
           .fill(EMPTY)
           .map((r) => Array(BOX_AREA).fill(EMPTY));
  }

  function empty_cell(matrix) {
    let row = 0;
    let col = 0;

    uscita: for (row = 0; row < matrix.length; row++)
      for (col = 0; col < matrix[row].length; col++)
        if (matrix[row][col] === EMPTY) {
          return {cell_empty: true, row, col}; 
        }

    return {cell_empty: false, row, col}
  }

  function solve_sudoku(matrix) {
    let {cell_empty, row, col} = empty_cell(matrix);
    
    if (cell_empty === false) {
      return true;
    }

    for (let num = 1; num <= (BOX_AREA); num++)
      if (is_move_valid(matrix, row, col, num)) {
        matrix[row][col] = num;
        if (solve_sudoku(matrix))
          return true;

        matrix[row][col] = EMPTY;
      }
    
    return false;
  }

  function is_move_valid(matrix, row, col, num) {
    return (
      !present_in_row(matrix, row, num) &&
      !present_in_col(matrix, col, num) &&
      !presentt_in_box(matrix, row - (row % BOX_ROW), col - (col % BOX_COL), num)
    );
  }

  function present_in_row(matrix, row, num) {
    for (let col = 0; col < matrix.length; col++)
      if (matrix[row][col] === num) {
        return true;
      }
    
    return false;
  }

  function present_in_col(matrix, col, num) {
    for (let row = 0; row < matrix.length; row++)
      if (matrix[row][col] === num) {
        return true;
      }
    
    return false;
  }

  function presentt_in_box(matrix, start_row, start_Col, num) {
    for (let row = 0; row < BOX_ROW; row++) 
      for (let col = 0; col < BOX_COL; col++) 
        if (matrix[row + start_row][col + start_Col] === num)
          return true;

    return false;
  }

  function solve() {
    let solution = sudoku_solver(matrix);
    matrix = [...solution];
  }
</script>

<main>
  <h1>Sudoku Solver</h1>
  <p>
    Inserisci i valori noti nella griglia e premi Solve per risolvere il Sudoko
  </p>

  <div class="row">
    {#each matrix as _, r}
      {#each matrix[r] as _, c}
        <div
          class="cell"
          contentEditable="true"
          on:keydown={(e) => validate(r, c, e)}
        >
          {#if matrix[r][c] != EMPTY}
            {matrix[r][c]}
          {/if}
        </div>
      {/each}
    {/each}
  </div>

  <button on:click={solve}>SOLVE!!</button>
</main>

<style>
  main {
    margin: auto;
    width: 30%;
    text-align: center;
  }

  h1 {
    font-size: 2.5rem;
  }

  p {
    margin-bottom: 1.2rem;
    font-size: 1.2rem;
    color: darkgray;
  }

  button {
    background-color: #04aa6d;
    border: none;
    color: white;
    padding: 10px 16px;
    font-size: 16px;
    margin-top: 2rem;
    cursor: pointer;
  }

  .row {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    gap: 0px;
  }

  .cell {
    display: flex;
    border: 1px dashed grey;
    aspect-ratio: 1;
    padding: 10px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
  }

  .cell:nth-child(3n) {
    border-right: 2px solid black;
  }

  .cell:nth-child(9n + 1) {
    border-left: 2px solid black;
  }

  .cell:nth-child(-n + 9) {
    border-top: 2px solid black;
  }

  .cell:nth-child(n + 28):nth-child(-n + 36) {
    border-top: 2px solid black;
  }

  .cell:nth-child(n + 55):nth-child(-n + 63) {
    border-top: 2px solid black;
  }

  .cell:nth-child(n + 73):nth-child(-n + 81) {
    border-bottom: 2px solid black;
  }
</style>
