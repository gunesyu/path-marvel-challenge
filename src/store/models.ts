export interface IAction {
	type: string
	payload: any
}

export interface IListState {
	offset: number
	limit: number
	pageCount: number
}

export interface IDetailState {
	minYear: number
	limit: number
	detailId: number | null
}