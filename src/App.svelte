<script lang="ts">
  // this variable will contain the value to make the request
  let query: string = undefined;
  // this variable control the input field for the search form
  let searchValue: string;

  type TitleLinkPair = {
    title: string;
    link: string;
  };

  // this function make the request to the Wikipedia API, process the response and return the results
  async function handleUserSearchSubmit(
    input: string
  ): Promise<TitleLinkPair[]> {
    let titleLinkPairs: TitleLinkPair[] = [];
    const apiReq =
      'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=opensearch&limit=10&namespace=0&search=' +
      input;
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
  <h1>Wikipedia Stats</h1>
  <form
    action="/"
    on:submit|preventDefault={() => {
      query = searchValue;
    }}
  >
    <input
      type="search"
      name="search"
      placeholder="Enter some wikipedia page"
      bind:value={searchValue}
    />
    <button type="submit">Search</button>
  </form>
</header>

{#if query !== undefined}
  {#await handleUserSearchSubmit(query) then titleLinkPairs}
    {#each titleLinkPairs as { title, link }}
      <div>
        {title}
        <a href={link}>See in Wikipedia</a>
      </div>
    {/each}
  {/await}
{/if}
