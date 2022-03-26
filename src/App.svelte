<script lang="ts">
  import { setContext } from 'svelte';
  import { apiCtx } from './app/store';
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
</script>

<header>
  <HomeForm />
</header>
<SearchResults />
<PageStats />
