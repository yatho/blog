<script lang="ts">
	export let src: string
	export let alt: string
</script>

<img {src} {alt} loading="lazy" />

<style>
	img {
		max-width: 100%;
		height: auto;
		display: block;
		margin: auto;
	}
</style>
