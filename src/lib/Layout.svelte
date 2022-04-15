<script lang="ts">
  import { query } from '../app/store';
  import { location, querystring } from 'svelte-spa-router';
  import { push } from 'svelte-spa-router';

  let searchValue: string = $querystring.replace(/q=/, '');
  $: hClass = $location === '/' ? 'initial' : 'results';
  let show: boolean;
  let selection: number = -1;
  let results: string[];
  $: reqQuery = '';

  // this is a ref of the input search
  let inputSearch: HTMLInputElement;

  // this is the type of the results of the search req, is made like this for styling purposes
  type Title = {
    match: string;
    rest: string;
  };

  // this function will be called each time the user writes in the search box
  async function handleUserSearchs(input: string): Promise<Title[]> {
    let titleLinkPairs: Title[] = [];
    selection = -1;
    const apiReq = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=opensearch&limit=8&namespace=0&search=${input}`;
    await fetch(apiReq)
      .then((res) => res.json())
      .then((data) => {
        // data is an array which contains 4 elements:
        // 0, is the search query passed to the API
        // 1, is an array with the page titles that matched the query, same size as 2 and 3
        // 2, is an array with empty string
        // 3, is an array with the link to the pages that matched the query
        results = data[1];
        for (let i = 0, n = results.length; i < n; i++) {
          let title = results[i];
          if (
            title.toLocaleLowerCase().indexOf(input.toLocaleLowerCase()) !== 0
          ) {
            let rest = results[i];
            titleLinkPairs.push({ match: '', rest });
            continue;
          }

          let match = title.slice(0, input.length);
          let rest = title.slice(input.length);
          titleLinkPairs.push({ match, rest });
        }
      });

    return titleLinkPairs;
  }

  // this function its used to navigate over the suggestions
  function keyboardNavigation(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
        if (selection > 0) {
          selection--;
          searchValue = results[selection];
        } else {
          selection = -1;
          searchValue = reqQuery;
        }
        break;
      case 'ArrowDown':
        if (selection < 7) {
          selection++;
          searchValue = results[selection];
        }
        break;
      default:
        break;
    }
  }

  // this function will determine to make a new req to the WikipediaAPI
  function handleInput() {
    reqQuery = searchValue;
  }
</script>

<svelte:window on:click={() => (show = false)} />

<nav class={hClass}>
  <div class={hClass}>
    <h1 class={hClass}>Wikipedia <span>stats</span></h1>

    <form
      action="/"
      on:submit|preventDefault={() => {
        $query = searchValue;
        push(`/search?q=${searchValue}`);
        inputSearch.blur();
      }}
    >
      <input
        type="search"
        name="q"
        placeholder="e.g. Wikipedia"
        autocomplete="off"
        bind:value={searchValue}
        bind:this={inputSearch}
        on:click|stopPropagation={() => (show = true)}
        on:keydown={keyboardNavigation}
        on:input={handleInput}
      />
      {#if searchValue !== undefined && searchValue !== ''}
        <img
          src="close.svg"
          class="reset"
          alt=""
          on:click={() => (searchValue = '')}
        />
      {/if}
      <button type="submit">Search</button>
    </form>

    {#if searchValue !== undefined && searchValue !== '' && show}
      {#await handleUserSearchs(reqQuery) then arr}
        <div class="suggestions" on:click|stopPropagation>
          {#each arr as { match, rest }}
            <div>{match}<span class="rest">{rest}</span></div>
          {/each}
        </div>
      {/await}
    {/if}
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
  .reset {
    width: 24px;
    height: 24px;
    position: relative;
    cursor: pointer;
    top: 6px;
    right: 6px;
  }
  .suggestions {
    width: 100%;
    background-color: #dedcc8;
    position: absolute;
  }
  .suggestions > div {
    padding: 10px;
  }
  .rest {
    font-weight: bold;
  }
</style>
