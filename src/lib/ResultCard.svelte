<script lang="ts">
  import { apiCtx } from '../app/store';
  import { getContext } from 'svelte';
  import { push } from 'svelte-spa-router';

  // this is the api URLv
  const { api } = getContext(apiCtx);

  async function handleDescription(input: string): Promise<string> {
    const apiReq = `${api}query&prop=description&titles=${input}`;
    let description: string;
    await fetch(apiReq)
      .then((res) => res.json())
      .then((data) => {
        const id = Object.keys(data.query.pages);
        ({ description } = data.query.pages[id[0]]);
      });

    return description;
  }

  export let title: string;
  export let link: string;
</script>

<div class="card">
  <div
    class="title"
    on:click={() => {
      push(`/p/${title}`);
    }}
  >
    <h2>
      {title}
    </h2>
    {#await handleDescription(title) then description}
      {#if description != undefined}
        <p>{description}</p>
      {/if}
    {/await}
  </div>
  <div class="extern-link">
    <a href={link}>Read Wikipedia page</a>
  </div>
</div>

<style>
  .card {
    padding: 8px 10px;
    margin: 10px;
    display: grid;
    grid-template-areas:
      'title'
      'wiki';
  }
  .title {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .title > h2 {
    font-size: 1.3rem;
    font-style: italic;
  }
  .title:hover {
    cursor: pointer;
  }
  .title:hover > h2 {
    text-decoration: underline;
  }
  .extern-link {
    font-family: 'IBM Plex Sans', Arial, Helvetica, sans-serif;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
  }
  .extern-link a {
    color: black;
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  .extern-link a:hover {
    text-decoration: underline;
  }
</style>
