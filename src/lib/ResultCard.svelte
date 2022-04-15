<script lang="ts">
  import { apiCtx } from '../app/store';
  import { getContext } from 'svelte';
  import { push } from 'svelte-spa-router';

  // this is the api URLv
  const { api } = getContext(apiCtx);

  async function getDescription(query: string): Promise<string> {
    let description = '';
    await fetch(`${api}query&prop=description&titles=${query}`)
      .then((res) => res.json())
      .then((data) => {
        const id = Object.keys(data.query.pages);
        ({ description } = data.query.pages[id[0]]);
      })
      .catch(console.error);

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
    <span>See stats of</span>
    <h2>
      {title}
    </h2>
    {#await getDescription(title) then description}
      <p>{description}</p>
    {/await}
    <p />
  </div>
  <div class="extern-link">
    <span>or Go to:</span>
    <a href={link} target="blank">{link}</a>
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
    gap: 5px;
  }
  .title > h2 {
    font-size: 1.2rem;
  }
  .title:hover {
    cursor: pointer;
  }
  .title:hover > h2 {
    text-decoration: underline;
  }
  a:hover {
    text-decoration: underline;
  }
  span,
  a {
    font-size: 0.8rem;
    color: black;
    text-decoration: none;
  }
</style>
