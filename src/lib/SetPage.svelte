<script lang="ts">
  import { page, home } from '../app/store';

  export let title: string;
  function showPageStats(value: string) {
    page.set(value);
    home.set(false);
  }
</script>

<button on:click={() => showPageStats(title)}>
  <slot />
</button>
