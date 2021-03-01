import { Middleware } from 'redux'
import { RootState } from './index'
import { CHAR_ID } from './actionTypes'


export const fetchDetailComics: Middleware<{}, RootState> = ({getState}) => next => action => {
    const returnValue = next(action)

    if(action.type === CHAR_ID) {
        console.log(action.payload)
    }


    return returnValue
}