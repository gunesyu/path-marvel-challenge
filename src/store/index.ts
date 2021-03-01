import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { fetchDetailComics } from './middlewares'
import reducers from './reducers'

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(fetchDetailComics))
)

export default store

export type RootState = ReturnType<typeof reducers>