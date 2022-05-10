<script lang="ts">
  import { apiCtx } from '../app/store';
  import { getContext } from 'svelte';
  import { link } from 'svelte-spa-router';

  const { api } = getContext(apiCtx);

  async function handleExtract(input: string): Promise<string> {
    const apiReq = `${api}query&prop=extracts&explaintext=true&exchars=300&titles=${input}`;
    let extract: string;
    await fetch(apiReq)
      .then((res) => res.json())
      .then((data) => {
        const id = Object.keys(data.query.pages);
        ({ extract } = data.query.pages[id[0]]);
      });

    return extract;
  }

  export let title;
  export let pageURL;
</script>

<div>
  <h2>{title}</h2>
  {#await handleExtract(title) then extract}
    <p>
      {extract}
    </p>
  {/await}
  <a href="/p/{title}" use:link>See stats</a>
  <a href={pageURL}>Read page</a>
</div>

<style>
  div {
    width: min(100%, 400px);
    background-color: #f0adff;
    border: 1px solid black;
    border-radius: 20px;
    padding: 25px;
    margin: auto;
    margin-top: 0;
  }
  h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  p {
    line-height: 1.2rem;
    margin-bottom: 15px;
  }
  a {
    font-style: italic;
    font-weight: 600;
    text-decoration: none;
    color: black;
    margin-right: 10px;
  }
  a:hover {
    text-decoration: underline;
  }
</style>
