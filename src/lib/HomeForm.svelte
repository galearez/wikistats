<script lang="ts">
  import { query } from '../app/store';

  let searchValue: string;
</script>

<h1>Wikipedia <span>stats</span></h1>

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

<style>
  h1 {
    font-size: 48px;
    text-align: center;
    margin-bottom: 50px;
  }
  h1 > span {
    color: white;
  }
  form {
    width: max(550px, 100%);
    display: flex;
    border: 2px solid black;
    flex-wrap: nowrap;
    background-color: white;
    padding-left: 10px;
  }
  input[type='search'] {
    border: none;
    width: min(550px, 100%);
    padding: 8px 0;
    font-size: 1.1rem;
    outline: none;
  }
  button {
    border: none;
    color: white;
    background-color: black;
  }
</style>
