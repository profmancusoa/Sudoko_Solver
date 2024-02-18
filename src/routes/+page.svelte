<script>
  import Sudoku from '$lib/components/Sudoku.svelte';
</script>

<main>
  <h1>Sudoku Solver</h1>
  <p>
    Inserisci i valori noti nella griglia e premi Solve per risolvere il Sudoko
  </p>

  <Sudoku />
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
</style>
