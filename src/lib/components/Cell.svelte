<script>
  export let row;
  export let col;
  export let validator;
  export let content;

  if(content == "0")
    content = "";
</script>

<div
  class="cell"
  contentEditable="true"
  on:keydown={(e) => validator(row, col, e)}
>
  {content}
</div>


<style>
  .cell {
    display: flex;
    border: 1px dashed grey;
    aspect-ratio: 1;
    padding: 10px;
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    font-size: clamp(0.4rem, 2vw, 1.4rem);
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
