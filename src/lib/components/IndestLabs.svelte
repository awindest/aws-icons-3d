<!--                                  
╭━━╮╱╱╱╱╭╮╱╱╱╱╱╭╮╱╭╮╱╱╱╱╱╭╮            ━╮ ╭━
╰┫┣╯╱╱╱╱┃┃╱╱╱╱╭╯╰╮┃┃╱╱╱╱╱┃┃             | |
╱┃┃╭━╮╭━╯┣━━┳━┻╮╭╯┃┃╱╱╭━━┫╰━┳━━╮       ╱ o \
╱┃┃┃╭╮┫╭╮┃┃━┫━━┫┃╱┃┃╱╭┫╭╮┃╭╮┃━━┫      ╱_____\
╭┫┣┫┃┃┃╰╯┃┃━╋━━┃╰╮┃╰━╯┃╭╮┃╰╯┣━━┃     ╱    o  \  
╰━━┻╯╰┻━━┻━━┻━━┻━╯╰━━━┻╯╰┻━━┻━━╯    (__o______)  

Yet another science experiment from Indest Labs.

Recommend viewing in Visual Source Code.
-->
<script>
	import { fade, fly } from 'svelte/transition'
	import { onMount } from 'svelte'
	let animateLabsLogo = false

	onMount(() => {
		animateLabsLogo = true
	})
</script>

{#if animateLabsLogo}
	<div transition:fly={{ y: 10, delay: 1000, duration: 2500 }} id="labs" title="Indest Labs">
		Indest Labs
		<!-- <img
			class="image"
			style="float:right;height:2.5em;filter:contrast(75%);"
			src="flask.svg"
			alt="Laboratory Flask"
		/> -->
	</div>
{/if}

<style>
	/* author's stamp */
	#labs {
		position: absolute;
		bottom: 0;
		margin-left: 0.5rem;
		margin-bottom: 0.5rem;
		background: transparent;
		color: #042e64;
		font-size: 18px;
		font-family: sans-serif;
		text-shadow:
			-1px -1px 2px #fff,
			-1px 1px 2px #fff,
			1px -1px 2px #fff,
			1px 1px 2px #fff;
	}
</style>
