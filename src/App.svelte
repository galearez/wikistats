<script lang="ts">
  import { setContext } from 'svelte';
  import { query, apiCtx, page } from './app/store';
  import HomeForm from './lib/HomeForm.svelte';
  import PageStats from './lib/PageStats.svelte';
  import SearchResults from './lib/SearchResults.svelte';

  // since this portion of the URL repeats on all of the reqs I hopted to make a
  // context to be passed to the children components
  const apiURL =
    'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=';
  setContext(apiCtx, {
    api: apiURL,
  });

  // define the code to read the query store value and be aware of its changes
  let queryValue: string;
  query.subscribe((value) => (queryValue = value));

  // this variable holds the user selected page to look to its stats
  let pageTitle: string = undefined;
  page.subscribe((value) => (pageTitle = value));

  type TitleLinkPair = {
    title: string;
    link: string;
  };

  // this function make the request to the Wikipedia API, process the response and return the results
  async function handleUserSearchSubmit(
    input: string
  ): Promise<TitleLinkPair[]> {
    let titleLinkPairs: TitleLinkPair[] = [];
    const apiReq = `${apiURL}opensearch&limit=10&namespace=0&search=${input}`;
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

<header>
  <HomeForm />
</header>

{#if queryValue !== undefined}
  {#await handleUserSearchSubmit(queryValue) then titleLinkPairs}
    <SearchResults {titleLinkPairs} />
  {/await}

  {#if pageTitle !== undefined}
  <PageStats />
  {/if}
{/if}
