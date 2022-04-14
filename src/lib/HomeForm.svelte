<script lang="ts">
  import { query, headerClass } from '../app/store';

  let searchValue: string;
  let hClass: string;
  headerClass.subscribe((value) => (hClass = value));
  let show: boolean;
  let selection: number = -1;
  let results: string[];
  $: reqQuery = '';

  type Title = {
    match: string;
    rest: string;
  };

  async function handleUserSearchSubmit(input: string): Promise<Title[]> {
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
          if (title.toLocaleLowerCase().indexOf(input) !== 0) {
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

  function keyboardSelection(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
        if (selection > 0) {
          selection--;
          searchValue = results[selection];
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

  function handleInput() {
    reqQuery = searchValue;
  }
</script>

<h1 class={hClass}>Wikipedia <span>stats</span></h1>

<svelte:window on:click={() => (show = false)} />

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
    autocomplete="off"
    bind:value={searchValue}
    on:click|stopPropagation={() => (show = true)}
    on:keydown={keyboardSelection}
    on:input={handleInput}
  />
  <button type="submit">Search</button>
  {#if searchValue !== undefined && searchValue !== ''}
    <img
      src="close.svg"
      class="reset"
      alt=""
      on:click={() => (searchValue = '')}
    />
  {/if}
</form>

{#if searchValue !== undefined && searchValue !== '' && show}
  {#await handleUserSearchSubmit(reqQuery) then arr}
    <div class="suggestions" on:click|stopPropagation>
      {#each arr as { match, rest }}
        <div>{match}<span class="rest">{rest}</span></div>
      {/each}
    </div>
  {/await}
{/if}

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
    width: 100%;
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
  .reset {
    width: 24px;
    height: 24px;
    position: absolute;
    bottom: 9px;
    right: 60px;
    cursor: pointer;
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
