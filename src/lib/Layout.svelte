<script lang="ts">
  import { query } from '../app/store';
  import { location } from 'svelte-spa-router';
  import { push } from 'svelte-spa-router';

  let searchValue: string;
  $: hClass = $location === '/' ? 'initial' : 'results';
</script>

<nav class={hClass}>
  <div class={hClass}>
    <h1 class={hClass}>Wikipedia <span>stats</span></h1>

    <form
      on:submit|preventDefault={() => {
        $query = searchValue;
        push(`/search?q=${searchValue}`);
      }}
    >
      <input
        type="search"
        name="q"
        placeholder="e.g. Wikipedia"
        bind:value={searchValue}
      />
      <button type="submit">Search</button>
    </form>
  </div>
</nav>

<slot />

<footer class={hClass}>footer</footer>

<style>
  nav.initial {
    width: 100%;
    height: 100vh;
  }
  nav.results {
    height: auto;
  }
  div.initial {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: min(550px, 100%);
  }
  div.results {
    position: static;
    display: flex;
    flex-direction: row;
    width: 100%;
  }
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
  footer.initial {
    height: 100vh;
  }
</style>
