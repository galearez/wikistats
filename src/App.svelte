<script lang="ts">
  import { setContext } from 'svelte';
  import { apiCtx, home, headerClass } from './app/store';
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

  // this will do something
  let hClass: any;
  headerClass.subscribe((value) => (hClass = value));
</script>

<main>
  {#if isHome}
    <header class={hClass}>
      <HomeForm />
    </header>
    <SearchResults />
  {:else}
    <PageStats />
  {/if}
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
  }
  .initial {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: min(550px, 100%);
  }
  .results {
    position: static;
    display: flex;
    flex-direction: row;
    width: 100%;
  }
</style>
