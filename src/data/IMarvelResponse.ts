import ICharacter from './ICharacter'

export default interface IMarvelResponse {
	results: ICharacter[]
	count: number
	limit: number
	offset: number
	total: number
}