<script lang="ts">
  import { formatDate } from "$lib/utils";
  export let data;
</script>

<!-- SEO -->
<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
  <meta name="description" content={data.meta.description} />
</svelte:head>

{#if data.meta.coverSrc}
  {#if data.meta.coverAlt}
    <img src={data.meta.coverSrc} alt={data.meta.coverAlt} loading="lazy" />
  {:else}
    <img src={data.meta.coverSrc} alt={data.meta.title} loading="lazy" />
  {/if}
{/if}

<article>
  <!-- Title -->
  <div>
    <h1>{data.meta.title}</h1>
    <p>{data.meta.readingTime.text}</p>
    <p>Published at {formatDate(data.meta.date)}</p>
  </div>

  <section class="categories">
    {#each data.meta.categories as category}
      <span>{category}</span>
    {/each}
  </section>

  <!-- Post -->
  <div class="prose">
    <svelte:component this={data.content} />
  </div>
</article>

<style>
  img {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  article {
    background-color: white;
    z-index: 20;
  }

  section.categories {
    display: flex;
    gap: 0.5rem;

    & > span {
      color: var(--color-theme-1);
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: capitalize;
    }
  }
</style>
