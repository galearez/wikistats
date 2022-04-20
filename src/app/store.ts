import { readable, writable } from 'svelte/store';

const apiCtx = readable<Symbol>(undefined, () => {
  Symbol();
});
const query = writable<string>('');

export { apiCtx, query };
