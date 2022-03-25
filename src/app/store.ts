import { writable } from "svelte/store";

const query = writable<string>(undefined);

export {query};