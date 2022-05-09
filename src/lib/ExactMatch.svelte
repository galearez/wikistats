<script lang="ts">
  import { apiCtx } from '../app/store';
  import { getContext } from 'svelte';
  import { link } from 'svelte-spa-router';

  const api = getContext(apiCtx);

  async function handleExtract(input: string): Promise<string> {
    const apiReq = `${api}query&prop=description&titles=${input}`;
    let extract: string;
    await fetch(apiReq)
      .then((res) => res.json())
      .then((data) => {
        const id = Object.keys(data.query.pages);
        ({ extract } = data.query.pages[id[0]]);
      });

    return extract;
  }

  export let title;
  export let pageURL;
</script>

<div>
  <h2>{title}</h2>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus rerum sit
    earum est inventore cumque fuga aspernatur fugiat quibusdam quod, dicta
    recusandae, modi exercitationem vitae reiciendis iste cupiditate, eos
    quisquam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
    voluptates sunt necessitatibus fugit officiis, dolor cum, porro perspiciatis
    deleniti dolorum odit error dolore, alias eveniet ea. Neque ut inventore
    dignissimos.
  </p>
  <a href="/page/{title}" use:link>See stats</a>
  <a href={pageURL}>Wikipedia</a>
</div>

<style>
  div {
    width: min(100%, 400px);
    background-color: #f0adff;
    border: 1px solid black;
    border-radius: 20px;
    padding: 25px;
    margin: auto;
    margin-top: 0;
  }
  h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  p {
    line-height: 1.2rem;
    margin-bottom: 15px;
  }
  a {
    font-style: italic;
    font-weight: 600;
    text-decoration: none;
    color: black;
    margin-right: 10px;
  }
  a:hover {
    text-decoration: underline;
  }
</style>
