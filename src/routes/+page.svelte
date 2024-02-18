<script>
  import Sudoku from '$lib/components/Sudoku.svelte';
</script>

<main>
  <h1>Sudoku Solver</h1>
  <p>
    Inserisci i valori noti nella griglia e premi Solve per risolvere il Sudoku
  </p>

  <Sudoku />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 0 40px;
  }

  h1 {
    font-size: 2.5rem;
  }

  p {
    margin-bottom: 1.2rem;
    font-size: 1.2rem;
    color: darkgray;
  }
</style>
