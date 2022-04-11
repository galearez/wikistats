<script lang="ts">
  import SetPage from './SetPage.svelte';
  import { query, apiCtx } from '../app/store';
  import { getContext } from 'svelte';

  const { api } = getContext(apiCtx);

  let queryValue: string;
  query.subscribe((value) => (queryValue = value));

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

{#if queryValue !== undefined}
  {#await handleUserSearchSubmit(queryValue) then titleLinkPairs}
    {#each titleLinkPairs as { title, link }}
      <div>
        <span>Stats for</span>
        <h2>
          {title}
        </h2>
        <a href={link} target="blank">{link}</a>
        <SetPage {title}>See stats</SetPage>
      </div>
    {/each}
  {/await}
{/if}

<style>
  div {
    padding: 8px 10px;
    margin: 10px;
    display: grid;
    grid-template-areas:
      'subtitle . .'
      'title title title'
      'stats wiki .';
    gap: 10px;
  }
  span {
    font-size: 0.8rem;
  }
  h2 {
    grid-area: title;
    font-size: 1.3rem;
  }
  a {
    grid-area: stats;
    font-size: 0.8rem;
  }
</style>
