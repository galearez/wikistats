<script lang="ts">
  import { query } from '../app/store';

  let searchValue: string;
  export let hClass: string;
</script>

<nav class={hClass}>
  <h1 class={hClass}>Wikipedia <span>stats</span></h1>

  <form
    action="/"
    on:submit|preventDefault={() => {
      $query = searchValue;
    }}
  >
    <input
      type="search"
      name="search"
      placeholder="e.g. Wikipedia"
      bind:value={searchValue}
    />
    <button type="submit">Search</button>
  </form>
</nav>

<slot />

<footer>footer</footer>

<style>
  h1 {
    color: black;
  }
  h1.initial {
    margin-bottom: 50px;
    font-size: 48px;
    text-align: center;
  }
  h1.results {
    font-size: 1rem;
    text-align: left;
    flex-shrink: 0;
    align-self: center;
  }
  h1 > span {
    color: #526166;
  }
  form {
    width: min(550px, 100%);
    background-color: #dedcc8;
    display: flex;
    flex-wrap: nowrap;
    padding-left: 10px;
    border: 2px solid black;
  }
  input[type='search'] {
    width: min(550px, 100%);
    background-color: #dedcc8;
    padding: 8px 0;
    border: none;
    font-size: 1.1rem;
    outline: none;
  }
  button {
    color: white;
    background-color: black;
    border: none;
  }
  nav.initial {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: min(550px, 100%);
  }
  nav.results {
    position: static;
    display: flex;
    flex-direction: row;
    width: 100%;
  }
</style>
