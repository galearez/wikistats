import { readable, writable } from 'svelte/store';

const apiCtx = readable<Symbol>(undefined, () => {
  Symbol();
});

export { apiCtx };
