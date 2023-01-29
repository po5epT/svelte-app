<script>
  export let loading = false;
</script>

<button
  type="button"
  disabled="{loading}"
  class="btn btn_green {$$props.class}"
  on:click
  >
    <slot></slot>
</button>

<style>
  .btn {
    display: inline-flex;
    border: 0;
    padding: 1rem 2rem;
    font-size: 1.25rem;
    font-weight: 500;
    color: #444;
    border-radius: 5px;
    transition: background-color 0.3s ease-out;
  }

  .btn:hover {
    cursor: pointer;
  }

  .btn[disabled],
  .btn[disabled]:hover {
    cursor: default;
    pointer-events: none;
    opacity: 0.75;
  }

  .btn_green {
    background-color: #2ecc71;
  }

  .btn_green:hover {
    background-color: #31e77a;
  }
</style>
