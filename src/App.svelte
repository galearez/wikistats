<script lang="ts">
  import { setContext } from 'svelte';
  import { apiCtx } from './app/store';
  import routes from './app/routes';
  import Router from 'svelte-spa-router';
  import Layout from './lib/Layout.svelte';

  // since this portion of the URL repeats on all of the reqs I hopted to make a
  // context to be passed to the children components
  const apiURL =
    'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=';
  setContext(apiCtx, {
    api: apiURL,
  });
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;1,300&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<Layout>
  <Router {routes} />
</Layout>
