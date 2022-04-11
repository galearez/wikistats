<script lang="ts">
  import { query, headerClass } from '../app/store';

  let searchValue: string;
  let hClass: string;
  headerClass.subscribe((value) => (hClass = value));
</script>

<h1 class={hClass}>Wikipedia <span>stats</span></h1>

<form
  action="/"
  on:submit|preventDefault={() => {
    $query = searchValue;
    $headerClass = 'results';
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
    flex-shrink: 0;
    align-self: center;
    color: black;
  }
  .initial {
    margin-bottom: 50px;
    font-size: 48px;
    text-align: center;
  }

  .results {
    font-size: 1rem;
    text-align: left;
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
</style>
