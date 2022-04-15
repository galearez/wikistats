<script lang="ts">
  import { page, home } from '../app/store';
  import { push } from 'svelte-spa-router';

  function showPageStats(value: string) {
    page.set(value);
    home.set(false);
  }

  export let title: string;
  export let link: string;
</script>

<div class="card">
  <div
    class="title"
    on:click={() => {
      showPageStats(title);
      push(`/p/${title}`);
    }}
  >
    <span>See stats of</span>
    <h2>
      {title}
    </h2>
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
    gap: 8px;
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
