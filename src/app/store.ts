import { readable, writable } from 'svelte/store';

const query = writable<string>(undefined);
const page = writable<string>(undefined);
const apiCtx = readable<Symbol>(undefined, () => {
  Symbol();
});
const home = writable<boolean>(true);

type HeaderClasses = 'initial' | 'results';
const headerClass = writable<HeaderClasses>('initial');

export { query, apiCtx, page, home, headerClass };
