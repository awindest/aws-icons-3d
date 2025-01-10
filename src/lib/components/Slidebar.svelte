<script>
	import fly from './transitions.js'
	export let open = false
</script>

{#if open}
	<div class="drawer" transition:fly={{ x: '100%' }}>
		<center><h1 class="symbol-info">Attribution</h1></center>
		<p>
			This work came from threejs
			<a href="https://github.com/mrdoob/three.js/blob/master/examples/css3d_periodictable.html">
				examples</a
			>
			and then adapted to sveltekit. To show more information, click on one of the services. Click on
			the More Info for more information.
			<br />You can move around by clicking and dragging or you can zoom in or out by scrolling. To
			search, click on the magnifying glass 🔍 or use the key combination of '⌘' K or 'Ctrl' K on
			Mac or Windows respectively.
			<br />
			You can click on the title of the search results to go to the AWS website for more information.
		</p>
		<p>
			See this <a href="https://jsfiddle.net/9tng8dp0/2/">fiddle</a> for a reference on how the 'pointerdown'
			event was used on the CSS3DObjects.
		</p>

		<p>Data Attribution:<br /><a href="https://aws-icons.com"> AWS Icons</a></p>
		<p>Source code may be found <a href="https://github.com/awindest/aws-icons-3d">here</a></p>
		<p>Future plans are maybe migrate to Threlte 8).</p>
	</div>
{/if}

<style>
	.drawer {
		position: fixed;
		z-index: 10;
		top: 0;
		right: 0;
		padding: 25px;
		height: 100vh;
		width: 400px;
		box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
		border-left: 1px solid rgba(127, 255, 255, 0.25);
		background: rgba(255, 255, 255, 0.25);
		background-color: rgba(0, 127, 127, 0.5);

		backdrop-filter: blur(20px);
		overflow: auto;
	}
	div {
		font-size: 20px;
		color: #ffffff;
		font-family:
			Helvetica Neue,
			Helvetica,
			Arial,
			sans-serif;
	}
</style>
