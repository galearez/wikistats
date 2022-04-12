<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { apiCtx, page } from '../app/store';
  import { querystring } from 'svelte-spa-router';

  let pageTitle: string;
  onMount(() => page.set(params.title));
  page.subscribe((value) => (pageTitle = value));

  const { api } = getContext(apiCtx);

  async function thumbnail(query: string): Promise<string> {
    let source = '';
    await fetch(
      `${api}query&prop=pageimages&piprop=thumbnail&pilicense=any&titles=${query}`
    )
      .then((res) => res.json())
      .then((data) => {
        const id = Object.keys(data.query.pages);
        ({ source } = data.query.pages[id[0]].thumbnail);
      })
      .catch(console.error);

    return source;
  }

  async function info(
    query: string
  ): Promise<{ title: string; touched: string; length: string }> {
    let title, touched, length;
    await fetch(`${api}query&prop=info&titles=${query}`)
      .then((res) => res.json())
      .then((data) => {
        const id = Object.keys(data.query.pages);
        ({ title, touched, length } = data.query.pages[id[0]]);
      })
      .catch(console.error);

    return { title, touched, length };
  }

  async function views(query: string): Promise<number> {
    let views = 0;
    await fetch(`${api}query&prop=pageviews&titles=${query}`)
      .then((res) => res.json())
      .then((data) => {
        const id = Object.keys(data.query.pages);
        const viewsRaw: string[] = Object.values(
          data.query.pages[id[0]].pageviews
        );
        for (let i = 30; i < 59; i++) {
          views += +viewsRaw[i];
        }
      })
      .catch(console.error);

    return views;
  }

  async function langs(query: string): Promise<number> {
    let langLinks = 0;
    await fetch(`${api}query&prop=langlinks&lllimit=max&titles=${query}`)
      .then((res) => res.json())
      .then((data) => {
        const id = Object.keys(data.query.pages);
        const langs: string[] = data.query.pages[id[0]].langlinks;
        langLinks = langs.length;
      })
      .catch(console.error);

    return langLinks;
  }

  export let params: any = {};
</script>

{#if pageTitle !== undefined}
  {#await thumbnail(pageTitle) then src}
    <img {src} alt="" />
  {/await}

  {#await info(pageTitle) then { title, touched, length }}
    <p>{title}</p>
    <p>{touched}</p>
    <p>{length}</p>
  {/await}

  {#await views(pageTitle) then views}
    <p>{views}</p>
  {/await}

  {#await langs(pageTitle) then langLinks}
    <p>{langLinks}</p>
  {/await}
{/if}
