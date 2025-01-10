import { json } from '@sveltejs/kit'

import services from './services.json' //these data are from https://aws-icons.com

export const prerender = true

// yeah, the data is local but keeping this around in case we want to change the API
export async function GET() {

	return json(services)
}
