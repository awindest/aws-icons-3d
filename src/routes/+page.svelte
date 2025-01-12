<script>
	import * as THREE from 'three'

	import TWEEN from 'three/examples/jsm/libs/tween.module.js'
	import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

	import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'

	import { onMount } from 'svelte'
	import 'iconify-icon'
	import Hamburger from '$components/Hamburger.svelte'
	import InfoPanel from '$components/InfoPanel.svelte'
	import IndestLabs from '$components/IndestLabs.svelte'
	import Search from '$components/Search.svelte'

	let open = false // state of aside
	let showSearch = false // state of search dialog
	let showInfoPanel = false // state of InfoPanel
	let serviceName
	let description
	let url
	let image
	let serviceSearch
	let styleBackgroundImage
	let XYPositions = [] // array of positions for responsive design

	let services //these data are from aws-icon.com

	let camera, scene, renderer
	let controls
	let search = 'loading'
	const objects = []
	const targets = { table: [], sphere: [], helix: [], grid: [] }
	const categoryGradients = {
		analytics: 'linear-gradient(45deg, #4D27A8 0%, #A166FF 100%)',
		'app-integration': 'linear-gradient(45deg, #B0084D 0%, #FF4F8B 100%)',
		blockchain: 'linear-gradient(45deg, #C8511B 0%, #FF9900 100%)',
		'business-applications': 'linear-gradient(45deg, #BD0816 0%, #FF5252 100%)',
		'cloud-financial-management': 'linear-gradient(45deg, #1B660F 0%, #6CAE3E 100%)',
		compute: 'linear-gradient(45deg, #C8511B 0%, #FF9900 100%)',
		containers: 'linear-gradient(45deg, #C8511B 0%, #FF9900 100%)',
		'customer-enablement': 'linear-gradient(45deg, #2E27AD 0%, #527FFF 100%)',
		database: 'linear-gradient(45deg, #2E27AD 0%, #527FFF 100%)',
		'developer-tools': 'linear-gradient(45deg, #2E27AD 0%, #527FFF 100%)',
		'end-user-computing': 'linear-gradient(45deg, #055F4E 0%, #56C0A7 100%)',
		'front-end-web-mobile': 'linear-gradient(45deg, #BD0816 0%, #FF5252 100%)',
		games: 'linear-gradient(45deg, #4D27A8 0%, #A166FF 100%)',
		'general-icons': 'linear-gradient(45deg, #4D27A8 0%, #A166FF 100%)',
		'internet-of-things': 'linear-gradient(45deg, #1B660F 0%, #6CAE3E 100%)',
		'machine-learning': 'linear-gradient(45deg, #055F4E 0%, #56C0A7 100%)',
		'management-governance': 'linear-gradient(45deg, #B0084D 0%, #FF4F8B 100%)',
		'media-services': 'linear-gradient(45deg, #C8511B 0%, #FF9900 100%)',
		'migration-transfer': 'linear-gradient(45deg, #055F4E 0%, #56C0A7 100%)',
		'networking-content-delivery': 'linear-gradient(45deg, #4D27A8 0%, #A166FF 100%)',
		'quantum-technologies': 'linear-gradient(45deg, #C8511B 0%, #FF9900 100%)',
		robotics: 'linear-gradient(45deg, #BD0816 0%, #FF5252 100%)',
		satellite: 'linear-gradient(45deg, #2E27AD 0%, #527FFF 100%)',
		'security-identity-compliance': 'linear-gradient(45deg, #BD0816 0%, #FF5252 100%)',
		storage: 'linear-gradient(45deg, #1B660F 0%, #6CAE3E 100%)',
		'vr-ar': 'linear-gradient(-45deg, #B0084D 0%, #FF4F8B 100%)'
	}

	onMount(async () => {
		services = await fetch('/api/data').then((res) => res.json())
		init()
		animate()
	})

	function setXYPositions() {
		const xMax = 22,
			yMax = 14

		for (let row = 0; row < yMax; row++) {
			for (let column = 0; column < xMax; column++) {
				XYPositions.push({
					x: column,
					y: row
				})
			}
		}
		// get the last remaining services
		const remainingX = services.length - xMax * yMax
		for (let column = 0; column < remainingX; column++) {
			XYPositions.push({
				x: column,
				y: yMax
			})
		}
	}
	function getCategory(inputString) {
		let stringFrags = inputString.split('/')
		return stringFrags[stringFrags.length - 2].toLowerCase()
	}
	function getCategoryGradient(inputString) {
		return categoryGradients[getCategory(inputString)]
	}
	// this long-winded function is invoked when the user clicks on an element and populates the fields
	// to display in a pop-up <dialog>
	// Note: all of the null values were replaced with the string 'no data' in the the periodic table data

	function showInfo(name) {
		// if search dialog is showing get rid of it
		if (showSearch === true) {
			showSearch = !showSearch
		}
		// name is the name of the element clicked
		const serviceObject = services.find((el) => el.name === name)
		serviceName = serviceObject['name']
		description = serviceObject['description']
		url = serviceObject['url']
		serviceSearch = url
		image = serviceObject['image']
		// let stringFrags = url.split('/')
		//serviceSearch = `https://aws.amazon.com/search/?searchQuery=${stringFrags[stringFrags.length - 1]}`
		styleBackgroundImage = getCategoryGradient(image)

		showInfoPanel = true // this will be set to false in the InfoPanel component
	}

	function init() {
		camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
		camera.position.z = 4000

		scene = new THREE.Scene()

		// services
		setXYPositions()
		for (let i = 0; i < services.length - 1; i++) {
			const element = document.createElement('div')
			// not a best practice
			element.addEventListener('pointerdown', function () {
				showInfo(this.getAttribute('title')) // show more information about the element
			})
			element.className = 'element'
			element.style.backgroundImage = getCategoryGradient(services[i].image)
			element.title = services[i].name

			const number = document.createElement('div')
			number.className = 'number'
			number.textContent = services[i].id
			element.appendChild(number)

			const name = document.createElement('div')
			name.className = 'name'
			name.textContent = services[i].name
			element.appendChild(name)

			const image = document.createElement('img')
			image.className = 'image'
			image.setAttribute('src', services[i].image)
			image.setAttribute('height', '80')
			image.setAttribute('width', '80')
			image.setAttribute('alt', `${services[i].name} icon`)
			element.appendChild(image)

			const objectCSS = new CSS3DObject(element)
			// place objects randomly about
			objectCSS.position.x = Math.random() * 4000 - 2000
			objectCSS.position.y = Math.random() * 4000 - 2000
			objectCSS.position.z = Math.random() * 4000 - 2000

			scene.add(objectCSS)

			objects.push(objectCSS)

			//
			// had to re-adjust positions for the 311 services
			const object = new THREE.Object3D()
			// object.position.x = XYPositions[i].x * 140 - 1330
			object.position.x = XYPositions[i].x * 135 - 1450
			// object.position.y = -(XYPositions[i].y * 180) + 990
			object.position.y = -(XYPositions[i].y * 185) + 1250
			targets.table.push(object)
		}

		// sphere

		const vector = new THREE.Vector3()

		for (let i = 0, l = objects.length; i < l; i++) {
			const phi = Math.acos(-1 + (2 * i) / l)
			const theta = Math.sqrt(l * Math.PI) * phi

			const object = new THREE.Object3D()
			// first arg is radius
			object.position.setFromSphericalCoords(1000, phi, theta)

			vector.copy(object.position).multiplyScalar(2)

			object.lookAt(vector)

			targets.sphere.push(object)
		}

		// helix

		for (let i = 0, l = objects.length; i < l; i++) {
			const theta = i * 0.175 + Math.PI
			// const y = -(i * 8) + 750
			const y = -(i * 8) + 1050

			const object = new THREE.Object3D()

			object.position.setFromCylindricalCoords(900, theta, y)

			vector.x = object.position.x * 2
			vector.y = object.position.y
			vector.z = object.position.z * 2

			object.lookAt(vector)

			targets.helix.push(object)
		}

		// grid

		for (let i = 0; i < objects.length; i++) {
			const object = new THREE.Object3D()
			const baseValue = 8
			// object.position.x = (i % baseValue) * 400 - 800
			object.position.x = (i % baseValue) * 400 - 1200
			object.position.y = -(Math.floor(i / baseValue) % baseValue) * 400 + 1000
			// object.position.z = Math.floor(i / 25) * 1000 - 2000
			object.position.z = Math.floor(i / (baseValue * baseValue)) * 1000 - 4000

			targets.grid.push(object)
		}

		//

		renderer = new CSS3DRenderer()
		renderer.setSize(window.innerWidth, window.innerHeight)
		document.getElementById('container').appendChild(renderer.domElement)

		//

		controls = new TrackballControls(camera, renderer.domElement)
		controls.minDistance = 300 // used to be 500
		controls.maxDistance = 6000
		controls.addEventListener('change', render)

		// initial state is table
		transform(targets.table, 2000)

		// run this if the user resizes the web browser

		window.addEventListener('resize', onWindowResize)
	}

	function transform(targets, duration) {
		TWEEN.removeAll()
		if (showSearch === true) {
			showSearch = !showSearch
		}

		for (let i = 0; i < objects.length; i++) {
			const object = objects[i]
			const target = targets[i]

			new TWEEN.Tween(object.position)
				.to(
					{ x: target.position.x, y: target.position.y, z: target.position.z },
					Math.random() * duration + duration
				)
				.easing(TWEEN.Easing.Exponential.InOut)
				.start()

			new TWEEN.Tween(object.rotation)
				.to(
					{ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
					Math.random() * duration + duration
				)
				.easing(TWEEN.Easing.Exponential.InOut)
				.start()
		}

		new TWEEN.Tween(this)
			.to({}, duration * 2)
			.onUpdate(render)
			.start()
	}

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()

		renderer.setSize(window.innerWidth, window.innerHeight)

		render()
	}

	function animate() {
		requestAnimationFrame(animate)

		TWEEN.update()

		controls.update()
	}

	function render() {
		renderer.render(scene, camera)
	}
</script>

<div id="info">
	<a href="https://aws-icons.com" target="_blank" rel="noopener">AWS Services in 3-D</a>

	<button
		on:click={() => (showSearch = !showSearch)}
		class="search-button"
		title="Search for a service"
	>
		<iconify-icon
			class="icon"
			icon="streamline-emojis:magnifying-glass-tilted-left"
			width="16"
			height="16"
		></iconify-icon>
	</button>
</div>
<div id="container"></div>
<div id="menu">
	<button on:click={() => transform(targets.table, 2000)}>TABLE</button>
	<button on:click={() => transform(targets.sphere, 2000)}>SPHERE</button>
	<button on:click={() => transform(targets.helix, 2000)}>HELIX</button>
	<button on:click={() => transform(targets.grid, 2000)}>GRID</button>
</div>

<Hamburger bind:open />

<InfoPanel bind:showInfoPanel {styleBackgroundImage}>
	<img class="info-image" src={image} alt={serviceName} />
	<h1 class="service-info">{serviceName}</h1>
	<p>{description}</p>
	<a href={serviceSearch} target="_blank" rel="noopener">More Info</a>
</InfoPanel>

<Search bind:showSearch />

<div id="resolution-disclaimer">
	<div id="disclaimer-wrapper">
		<p>
			Oops, we designed this site for desktop rather than mobile viewing. Please come back on a
			desktop or view on a screen at least 1024 by 768 pixels in size.
		</p>
		<p>Thanks and enjoy the show!</p>
	</div>
</div>
<IndestLabs />

<style>
	/* :root {
        --main-color: indigo;
        --element-box-shadow-hover-color: rgba(0,255,255,0.75)
    } */

	:global(body) {
		font-family: 'Helvetica', sans-serif;
		font-size: 1rem;
		color: hsl(220 10% 98%);
		background-color: hsl(220 10% 10%);
	}

	a {
		color: #8ff;
	}

	#menu {
		position: absolute;
		bottom: 20px;
		width: 100%;
		text-align: center;
	}

	:global(.element) {
		/* width: 120px;
		height: 160px; */
		width: 128px;
		height: 175px;
		box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
		border: 1px solid rgba(127, 255, 255, 0.25);
		font-family: Helvetica, sans-serif;
		text-align: center;
		line-height: normal;
		cursor: default;
	}

	:global(.element:hover) {
		box-shadow: 0px 0px 12px rgba(255, 255, 255, 0.75);
		/* border: 1px solid rgba(127, 255, 255, 0.75); */
		border: 1px solid inherit;
		cursor: pointer;
	}

	:global(.element .number) {
		position: absolute;
		top: 5px;
		right: 5px;
		font-size: 12px;
		/* color: rgba(127, 255, 255, 0.75); */
		color: rgba(230, 238, 238, 0.75);
	}

	:global(.element .name) {
		position: absolute;
		/* bottom: 10px; */
		bottom: 1rem;
		left: 0px;
		right: 0px;
		/* font-size: 20px; */
		font-size: clamp(0.75rem, 3vw, 1.25rem);
		font-weight: bold;
		vertical-align: middle;
		color: rgba(255, 255, 255, 0.75);
		/* text-shadow: 0 0 10px rgba(0, 255, 255, 0.95); */
		text-shadow: 0 0 10px inherit;
		z-index: 1;
	}

	:global(.element .details) {
		position: absolute;
		bottom: 15px;
		left: 0px;
		right: 0px;
		font-size: 12px;
		color: rgba(127, 255, 255, 0.75);
	}
	:global(.service-info) {
		line-height: normal;
		text-align: center;
		text-shadow: 0 0 10px rgba(0, 255, 255, 0.95);
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
	.search-button {
		outline: none;
	}
	.search-button:hover {
		background-color: transparent;
	}
	.search-button:active {
		background-color: none;
	}
	.icon {
		color: var(--gray-6);
		height: 1em;
		inset: 0;
		margin-left: 0.5em;
		transition: 1.3s;
	}

	.icon:hover {
		color: var(--gray-8);
		transform: scale(1.5);
	}
	iconify-icon {
		display: inline-block;
		width: 1em;
		height: 1em;
	}
	:global(.image) {
		padding-top: 1rem;
		background-color: inherit;
		filter: drop-shadow(1px 2px 3px hsl(211deg 11% 62% / 0.3))
			drop-shadow(2px 4px 6px hsl(211deg 11% 62% / 0.3))
			drop-shadow(4px 8px 12px hsl(211deg 11% 62% / 0.3));
	}
	:global(.info-image) {
		display: block;
		margin: auto;
		height: '160';
		width: '160';
		background-color: inherit;
		filter: drop-shadow(1px 2px 3px hsl(211deg 11% 62% / 0.3))
			drop-shadow(2px 4px 6px hsl(211deg 11% 62% / 0.3))
			drop-shadow(4px 8px 12px hsl(211deg 11% 62% / 0.3));
	}
</style>
