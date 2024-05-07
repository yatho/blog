<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { base } from '$app/paths';
	export let data;
</script>

<svelte:head>
	<title>Liste des postes</title>
	<meta name="description" content="Liste des postes ordonné par date" />
</svelte:head>

<!-- Posts -->
<section>
	<ul>
		{#each data.posts as post}
		<li class="post">
			<a href="{base}/{post.slug}">
				<section class="title">
					<h2>{post.title}</h2>
					<section class="data">
						<span class="time">{post.readingTime.text}</span>
						<span class="date">{formatDate(post.date)}</span>
					</section>
				</section>
				<p>{post.description}</p>
			</a>
		</li>
		{/each}
	</ul>
</section>

<style>
	a {
		color: var(--color-text);
		text-decoration: none;

		& h2 {
			color: var(--color-theme-1);
		}
	}

	a:hover h2 {
		text-decoration: underline;
	}

	ul {
		padding: 0;
	}

	.post {
		margin-bottom: 1rem;
		list-style: none;
		padding: 1rem;
		border: 1px solid hsl(0, 0%, 100%);

		&:hover {
			border-color: hsl(0, 0%, 90%);
		}

		& .title {
			@media screen and (width >= 768px){
				display: flex;
				align-items: baseline;
				justify-content: space-between;
			}

			& .data {
				display: flex;
				flex-direction: column;
				align-items: flex-end;

				@media screen and (width < 768px){
					flex-direction: row-reverse;
					justify-content: space-between;
				}
			}

			& .time {
				font-size: 0.8rem;
				color: #666;
			}
		}
	}
</style>