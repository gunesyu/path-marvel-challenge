import { combineReducers } from 'redux'
import * as actions from './actionTypes'
import {IAction, IListState, IDetailState} from './models'


const initialListState: IListState = {
	offset: 30,
	limit: 30,
	pageCount: 1,
}
const listReducer = (state = initialListState, { type, payload }: IAction) => {
	switch (type) {
		case actions.PAGE_COUNT:
			return { ...state, pageCount: payload }
		default:
			return state
	}
}

const initialDetailState: IDetailState = {
	minYear: 2005,
	limit: 10,
	detailId: null,
}
const detailReducer = (state = initialDetailState, { type, payload }: IAction) => {
	switch (type) {
		case actions.CHAR_ID:
			return { ...state, detailId: payload }
		default:
			return state
	}
}

const reducers = {
	list: listReducer,
	details: detailReducer,
}

export default combineReducers(reducers)
