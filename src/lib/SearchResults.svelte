<script lang="ts">
  import SetPage from './SetPage.svelte';

  type TitleLinkPair = {
    title: string;
    link: string;
  };
  export let titleLinkPairs: TitleLinkPair[] = [];
</script>

{#each titleLinkPairs as { title, link }}
  <div>
    {title}
    <a href={link}>See in Wikipedia</a>
    <SetPage {title}>See stats</SetPage>
  </div>
{/each}
