import axios from 'axios'
import md5 from 'md5'
import IMarvelResponse from '../data/IMarvelResponse'
import ICharacter from '../data/ICharacter'

const API_KEY = process.env.REACT_APP_API_KEY_PUBLIC
const API_KEY_PRIVATE = process.env.REACT_APP_API_KEY_PRIVATE
const TIMESTAMP = Date.now()
const MESSAGE = `${TIMESTAMP}${API_KEY_PRIVATE}${API_KEY}`
const HASH = md5(MESSAGE)

const API = axios.create({
	baseURL: `https://gateway.marvel.com:443/v1/public/`,
	params: {
		apikey: API_KEY,
		hash: HASH,
		ts: TIMESTAMP,
	},
	xsrfCookieName: 'XSRF-TOKEN',
	xsrfHeaderName: 'X-XSRF-TOKEN',
})

API.interceptors.response.use(
	(response) => {
		return response.data.data
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default API

export function getCharacters(offset: number = 0, limit: number = 30) {
	return new Promise((resolve: (value: IMarvelResponse) => void, reject) => {
		API.get<any, IMarvelResponse>(
			`/characters?limit=${limit}&offset=${offset}`
		)
			.then((response: IMarvelResponse) => {
				resolve(response)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export function getCharacterDetails(id: string) {
	return new Promise((resolve: (value: ICharacter | undefined) => void, reject) => {
		API.get<any, IMarvelResponse>(`/characters/${id}`)
			.then((response: IMarvelResponse) => {
				const result = response.results.pop()
				resolve(result)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export function getCharacterComics(id: string, {limit, startYear}: {limit: number, startYear: number}) {
	return new Promise((resolve: (value: IMarvelResponse) => void, reject) => {
		API.get<any, IMarvelResponse>(
			`/characters/${id}/comics?startYear=${startYear}&orderBy=-onsaleDate&limit=${limit}`
		)
			.then((response: IMarvelResponse) => {
				resolve(response)
			})
			.catch((error) => {
				reject(error)
			})
	})
}