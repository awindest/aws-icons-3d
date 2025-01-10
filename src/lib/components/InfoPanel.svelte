<script>
	export let showInfoPanel = false // boolean
	export let styleBackgroundImage // color of background image

	let dialog // HTMLDialogElement
	$: if (dialog && showInfoPanel) dialog.showModal()
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showInfoPanel = false)}
	on:click|self={() => dialog.close()}
	style={`background-image: ${styleBackgroundImage};`}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="dialog_content" on:click|stopPropagation>
		<slot></slot>
	</div>
	<!-- svelte-ignore a11y-autofocus -->
	<div class="wrapper">
		<button class="button" autofocus on:click={() => dialog.close()}>CLOSE</button>
	</div>
</dialog>

<style>
	dialog {
		padding: 0;
		/* height: 100vh; */
		width: 400px;
		text-align: 'center';

		box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
		border: 1px solid rgba(127, 255, 255, 0.25);
		background: rgba(255, 255, 255, 0.25);
		background-color: rgba(0, 127, 127, 0.5);
		backdrop-filter: blur(20px);
		overflow-x: hidden;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 0em; /* keeping this around; just to get rid of warning */
	}
	dialog[open] {
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
	dialog[open]::backdrop {
		animation: fade 1.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
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
	.dialog_content {
		inset: 1em;
		margin: 1em;
	}
	.wrapper {
		position: relative;
		padding-top: 1em;
		bottom: 15px;
		width: 100%;
		text-align: center;
	}
	button {
		color: rgba(127, 255, 255, 0.75);
		background: transparent;
		outline: 1px solid rgba(127, 255, 255, 0.75);
		border: 0px;
		padding: 5px 10px;
		cursor: pointer;
	}

	button:hover {
		background-color: rgba(0, 255, 255, 0.5);
	}

	button:active {
		color: #000000;
		background-color: rgba(0, 255, 255, 0.75);
	}
</style>
