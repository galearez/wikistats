<script lang="ts">
  import { apiCtx, query } from '../app/store';
  import { getContext, onMount } from 'svelte';
  import { location, push, querystring } from 'svelte-spa-router';

  let { api } = getContext(apiCtx);

  // this reactive value is used to trigger the req to the search WikipediaAPI for input suggestions
  $: reqQuery = '';
  // this method will pre-load suggestions if the user get for the first time in 'Search' using the url bar
  onMount(() => (reqQuery = $querystring.replace(/q=/, '')));
  // this variable will hold the values in the URL to make searches
  let searchValue: string;
  query.subscribe((value) => (searchValue = value));
  // this reactive value is for styling purposes
  $: hClass = $location === '/' ? 'initial' : 'results';
  // this variable show and hide the suggestions box
  let show: boolean;
  // this variable is used to navigate through the suggestions
  let selection: number = -1;
  // this is a copy of the suggestions array
  let results: string[];

  // this is a ref of the input search
  let inputSearch: HTMLInputElement;

  // this is the type of the results of the search req, is made like this for styling purposes
  type Title = {
    // exact match with the user input, will go in light font
    match: string;
    // part of the suggestion that doesn't match (can be the whole string), will go in bold font
    rest: string;
  };

  // this function will be called each time the user writes in the search box
  async function handleUserSearchs(input: string): Promise<Title[]> {
    let titleLinkPairs: Title[] = [];
    selection = -1;
    const apiReq = `${api}opensearch&limit=8&namespace=0&search=${input}`;
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

  // I need to only send new req to search when the user input is a valid non-empty srting
  function handleFormSubmit() {
    if (searchValue === undefined || searchValue === '') {
      return;
    }
    push(`/search?q=${searchValue}`);
    inputSearch.blur();
  }
</script>

<svelte:window on:click={() => (show = false)} />

<nav class={hClass}>
  <div class={hClass}>
    <h1 class={hClass}>Wikipedia <span>stats</span></h1>

    <form action="/" on:submit|preventDefault={handleFormSubmit}>
      <input
        type="search"
        name="q"
        placeholder="Search"
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
      <button type="submit">
        <img src="search.svg" alt="" />
      </button>
      {#if searchValue !== undefined && searchValue !== '' && show}
        {#await handleUserSearchs(reqQuery) then arr}
          <div class="suggestions" on:click|stopPropagation>
            {#each arr as { match, rest }}
              <div>{match}<span class="rest">{rest}</span></div>
            {/each}
          </div>
        {/await}
      {/if}
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
    padding: 20px;
  }
  div.initial {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: min(550px, 100%);
  }
  div.results {
    position: initial;
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  h1 {
    color: black;
    font-family: Georgia, 'Times New Roman', Times, serif;
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
    font-style: italic;
    font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif;
    font-weight: 300;
  }
  div.results > form {
    margin-left: 30px;
  }
  form {
    width: min(550px, 100%);
    background-color: #fff9ba;
    display: flex;
    flex-wrap: nowrap;
    padding-left: 25px;
    border: 1px solid black;
    position: relative;
    border-radius: 50px;
  }
  input[type='search'] {
    width: min(550px, 100%);
    background-color: #fff9ba;
    font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    padding: 8px 0;
    border: none;
    outline: none;
  }
  button {
    color: black;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0 8px;
  }
  button > img {
    width: 32px;
    margin-top: 2px;
  }
  footer.initial {
    height: 100vh;
  }
  .reset {
    width: 24px;
    height: 24px;
    position: relative;
    cursor: pointer;
    top: 11px;
    right: 6px;
  }
  .suggestions {
    width: min(550px, 100%);
    padding: 8px 0 8px 20px;
    border: 1px solid black;
    border-radius: 25px;
    background-color: #c7d6ff;
    position: absolute;
    top: 58px;
    left: 0;
  }
  .suggestions > div {
    padding: 10px;
  }
  .rest {
    font-weight: bold;
  }
</style>
