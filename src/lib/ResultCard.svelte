<script lang="ts">
  import { apiCtx } from '../app/store';
  import { getContext } from 'svelte';
  import { push } from 'svelte-spa-router';

  // this is the api URLv
  const { api } = getContext(apiCtx);

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
    <p />
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
    gap: 5px;
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
  }
  .extern-link > img {
    width: 20px;
  }
</style>
