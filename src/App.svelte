<script lang="ts">
  // this variable will contain the value to make the request
  let query: string = undefined;
  // this variable control the input field for the search form
  let searchValue: string;
  // function to follow the wikipedia query format
  function regularize(s: string): string {
    if (s === undefined || s === '') {
      return undefined;
    }

    return s.toLocaleLowerCase().replace(/\s+/g, '_');
  }
</script>

<header>
  <h1>Wikipedia Stats</h1>
  <form
    action="/"
    on:submit|preventDefault={() => {
      query = regularize(searchValue);
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
