<script lang="ts">
  import { setContext } from 'svelte';
  import { apiCtx, home } from './app/store';
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

  // this store value will control which component is rendered
  let isHome: boolean;
  home.subscribe((value) => (isHome = value));
</script>

{#if isHome}
  <header>
    <HomeForm />
  </header>
  <SearchResults />
{:else}
  <PageStats />
{/if}
