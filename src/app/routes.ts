import Search from '../routes/Search.svelte';
import Page from '../routes/Page.svelte';

export default {
  '/search': Search,
  '/p/:title': Page,
};
