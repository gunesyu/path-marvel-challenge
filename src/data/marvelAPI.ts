import axios from 'axios'
import md5 from 'md5'

import IMarvelResponse from '../data/IMarvelResponse'

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
        API.get<any, IMarvelResponse>(`/characters?limit=${limit}&offset=${offset}`)
            .then((response: IMarvelResponse) => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}