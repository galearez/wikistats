<script lang="ts">
  import { apiCtx, query } from '../app/store';
  import { getContext } from 'svelte';
  import { querystring } from 'svelte-spa-router';
  import ResultCard from '../lib/ResultCard.svelte';
  import ExactMatch from '../lib/ExactMatch.svelte';

  const { api } = getContext(apiCtx);

  let queryValue: string;
  $: {
    queryValue = $querystring.replace(/q=/, '').replace(/%20/g, ' ');
    $query = queryValue;
  }

  type TitleLinkPair = {
    title: string;
    link: string;
  };

  // this function make the request to the Wikipedia API, process the response and return the results
  async function handleUserSearchSubmit(
    input: string
  ): Promise<TitleLinkPair[]> {
    let titleLinkPairs: TitleLinkPair[] = [];
    const apiReq = `${api}opensearch&limit=10&namespace=0&search=${input}`;
    await fetch(apiReq)
      .then((res) => res.json())
      .then((data) => {
        // data is an array which contains 4 elements:
        // 0, is the search query passed to the API
        // 1, is an array with the page titles that matched the query, same size as 2 and 3
        // 2, is an array with empty string
        // 3, is an array with the link to the pages that matched the query
        for (let i = 0, n = data[1].length; i < n; i++) {
          titleLinkPairs.push({ title: data[1][i], link: data[3][i] });
        }
      });

    return titleLinkPairs;
  }
</script>

<main>
  {#if queryValue !== undefined}
    {#await handleUserSearchSubmit(queryValue) then titleLinkPairs}
      <div>
        {#each titleLinkPairs as { title, link }}
          <ResultCard {title} {link} />
        {/each}
      </div>
      {#if titleLinkPairs[0].title.toLowerCase() === queryValue.toLowerCase()}
        <ExactMatch
          title={titleLinkPairs[0].title}
          pageURL={titleLinkPairs[0].link}
        />
      {/if}
    {/await}
  {/if}
</main>

<style>
  main {
    margin-left: 165px;
    width: min(1000, 100%);
    display: flex;
    justify-content: space-between;
  }
  div {
    width: min(100%, 700px);
  }
</style>
