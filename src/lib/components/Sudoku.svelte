<script>
  import Cell from "./Cell.svelte";

  const EMPTY = 0;
  const BOX_ROW = 3;
  const BOX_COL = 3;
  const BOX_AREA = BOX_ROW * BOX_COL;

  let game_matrix = [
    [7, 8, 0, 6, 0, 9, 5, 0, 0],
    [0, 0, 6, 7, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 8, 0],
    [0, 0, 8, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 9, 0, 0],
    [4, 2, 0, 3, 0, 0, 0, 5, 0],
    [5, 7, 0, 4, 0, 0, 0, 2, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 3, 0, 0, 4]
  ];


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

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function solve_sudoku(matrix) {
    await sleep(1);
    let {cell_empty, row, col} = empty_cell(matrix);

    if (cell_empty === false) {
      return true;
    }

    for (let num = 1; num <= (BOX_AREA); num++)
      if (is_move_valid(matrix, row, col, num)) {
        matrix[row][col] = num;
        game_matrix = [...matrix];
        if (await solve_sudoku(matrix))
          return true;
        matrix[row][col] = EMPTY;
        game_matrix = [...matrix];
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
    let solution = sudoku_solver(game_matrix);
    game_matrix = [...solution];
  }
</script>

<div class="row">
  {#each game_matrix as _, r}
    {#each game_matrix[r] as _, c}
      <Cell
        row={r}
        col={c}
        validator={validate}
      >
        {game_matrix[r][c]}
      </Cell>
    {/each}
  {/each}
</div>

<button on:click={solve}>SOLVE!!</button>


<style>
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
    min-width: clamp(100px, 50vw, 600px);
  }
</style>
