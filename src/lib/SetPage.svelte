<script lang="ts">
  import { page } from '../app/store';

  export let title: string;
  function showPageStats(value: string) {
    page.set(value);
  }
</script>

<button on:click={() => showPageStats(title)}>
  <slot />
</button>
