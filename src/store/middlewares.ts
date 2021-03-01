import { Middleware } from 'redux'
import { RootState } from './index'
import { CHAR_ID, CHAR_COMICS } from './actionTypes'
import { getCharacterComics } from '../data/marvelAPI'


export const fetchDetailComics: Middleware<{}, RootState> = ({getState, dispatch}) => next => action => {
    let returnValue = next(action)

    if(action.type === CHAR_ID) {
        const {minYear, limit} = getState().details
        const id = action.payload
        getCharacterComics(id, {limit, startYear: minYear}).then(res => {
            if(res.count) {
                dispatch({ type: CHAR_COMICS, payload: res.results })
            }
        })
    }
    return returnValue
}