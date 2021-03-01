export default interface IComic {
    id: string
    title: string
    description: string
    isbn: string
	thumbnail: {
		path: string
		extension: string
	}
}