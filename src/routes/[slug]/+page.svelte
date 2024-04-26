<script lang="ts">
	import { formatDate } from '$lib/utils'
	export let data;
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:t.itle" content={data.meta.title} />
</svelte:head>

<article>
  <!-- Title -->
  <div>
      <h1>{data.meta.title}</h1>
	  <p>{data.meta.readingTime.text}</p>
      <p>Published at {formatDate(data.meta.date)}</p>
  </div>

  <!-- Tags -->
	<div class="tags">
		{#each data.meta.categories as category}
			<span>{category}</span>
		{/each}
	</div>

  <!-- Post -->
	<div class="prose">
		<svelte:component this={data.content} />
	</div>
</article>
