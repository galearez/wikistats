import { readable, writable } from 'svelte/store';

const query = writable<string>(undefined);
const page = writable<string>(undefined);
const apiCtx = readable<Symbol>(undefined, () => {
  Symbol();
});

export { query, apiCtx, page };
