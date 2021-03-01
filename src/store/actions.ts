import * as actions from './actionTypes'

export const setPageCount = (count: number) => {
    return {
        type: actions.PAGE_COUNT,
        payload: count
    }
}

export const setCharId = (id: string) => {
    return {
        type: actions.CHAR_ID,
        payload: id
    }
}