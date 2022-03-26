<script lang="ts">
  import SetPage from './SetPage.svelte';
  import { query } from '../app/store';

  let queryValue: string;
  query.subscribe((value) => (queryValue = value));

  type TitleLinkPair = {
    title: string;
    link: string;
  };
  export let titleLinkPairs: TitleLinkPair[] = [];
</script>

{#if queryValue !== undefined}
  {#each titleLinkPairs as { title, link }}
    <div>
      {title}
      <a href={link}>See in Wikipedia</a>
      <SetPage {title}>See stats</SetPage>
    </div>
  {/each}
{/if}
