<script lang="ts">
  import { query } from '../app/store';

  let searchValue: string;
</script>

<h1>Wikipedia stats</h1>

<form
  action="/"
  on:submit|preventDefault={() => {
    $query = searchValue;
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
