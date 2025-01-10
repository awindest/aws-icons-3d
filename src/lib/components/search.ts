import FlexSearch from 'flexsearch'

export type Service = {
	id: string
	name: string
	image: string
	url: string
	description: string
}

export type Result = {
	description: string[]
	name: string
	image: string
	url: string
}

let servicesIndex: FlexSearch.Index
let services: Service []

export function createServicesIndex(data: Service[]) {
	servicesIndex = new FlexSearch.Index({ tokenize: 'forward' })

	data.forEach((service, i) => {
		const item = `${service.name} ${service.description}`
		servicesIndex.add(i, item)
	})
	services = data
}

export function searchServicesIndex(searchTerm: string) {
	const match = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	const results = servicesIndex.search(match)

	return results
		.map((index) => services[index as number])
		.map(({ name, image, url, description }) => {
			return {
				name: replaceTextWithMarker(name, match),
				image,
				url,
				description: getMatches(description, match)
			}
		})
}

function replaceTextWithMarker(text: string, match: string) {
	const regex = new RegExp(match, 'gi')
	return text.replaceAll(regex, (match) => `<mark>${match}</mark>`)
}

function getMatches(text: string, searchTerm: string, limit = 1) {
	const regex = new RegExp(searchTerm, 'gi')
	const indexes = []
	let matches = 0
	let match

	while ((match = regex.exec(text)) !== null && matches < limit) {
		indexes.push(match.index)
		matches++
	}

	return indexes.map((index) => {
		const start = index - 20
		const end = index + 80
		const excerpt = text.substring(start, end).trim()
		return `...${replaceTextWithMarker(excerpt, searchTerm)}...`
	})
}
