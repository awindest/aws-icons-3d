<script lang="ts">
	import { onMount } from 'svelte'
	import {
		createServicesIndex,
		searchServicesIndex,
		type Result,
		type Service
	} from '$components/search'

	let search: 'loading' | 'ready' = 'loading'
	let searchTerm = ''
	let results: Result[] = []
	export let showSearch: Boolean = false // show search dialog or not
	let services: Service[]

	onMount(async () => {
		services = await fetch('/api/search').then((res) => res.json())
		createServicesIndex(services)
		search = 'ready'
	})

	$: if (search === 'ready') {
		results = searchServicesIndex(searchTerm)
	}
</script>

<svelte:window
	on:keydown={(e) => {
		if (e.ctrlKey || e.metaKey) {
			if (e.key === 'k' || e.key === 'K') {
				e.preventDefault()
				showSearch = !showSearch
			}
		}
		if (e.key === 'Escape') {
			e.preventDefault()
			showSearch = false
		}
	}}
/>
{#if search === 'ready' && showSearch === true}
	<div class="search">
		<input
			bind:value={searchTerm}
			placeholder="Search"
			autocomplete="off"
			spellcheck="false"
			type="search"
			autofocus
		/>

		<div class="results">
			{#if results}
				<ul>
					{#each results as result}
						<li>
							<a href={result.url} target="_blank" rel="noopener">
								<img src={result.image} alt={result.name} />
								{@html result.name}
							</a>

							<p>{@html result.description}</p>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
{/if}

<style>
	:global(body) {
		font-family: 'Helvetica', sans-serif;
		font-size: 1.5rem;
		color: hsl(220 10% 98%);
		background-color: hsl(220 10% 10%);
	}

	.search {
		width: 90vw;
		max-width: 600px;
		position: fixed;
		left: 50%;
		top: 20%;
		translate: -50% -0%;
		border-radius: 0.5rem;
		box-shadow: 0px 0px 20px hsl(0 0% 0% / 40%);
		overflow: hidden;

		& input {
			width: 100%;
			padding: 1.5rem;
			color: hsl(220 10% 98%);
			background-color: hsl(220 10% 20%);
			font: inherit;
			border: none;
			outline: none;
			&:focus {
				box-shadow: none;
				border-radius: 0px;
			}
		}
	}
	input[open] {
		animation: zoom 1s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.1);
		}
		to {
			transform: scale(1);
		}
	}

	.results {
		max-height: 48vh;
		padding: 2rem;
		background-color: hsl(220 10% 14%);
		overflow-y: auto;
		scrollbar-width: thin;

		& ul {
			display: grid;
			gap: 1rem;
			padding: 0px;
			margin: 0px;
			list-style: none;

			& li:not(:last-child) {
				padding-block: 0.5rem;
				border-bottom: 1px solid hsl(220 10% 20%);
			}
		}

		& a {
			display: block;
			font-size: 1.5rem;
			color: hsl(220 10% 80%);
			/* text-decoration: none; */
			transition: color 0.3s ease;
			margin: 1rem;
			&:hover {
				color: white;
				transform: scale(1.1);
				transition: 0.3s ease;
			}
		}
	}
	img {
		vertical-align: middle;
	}
</style>
