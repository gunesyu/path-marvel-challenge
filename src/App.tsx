import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/index'

import './App.css';

import Details from './pages/Details';
import List from './pages/List'

function App() {
  return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route exact path='/'>
						<List />
					</Route>
					<Route path='/character/:id'>
						<Details />
					</Route>
				</Switch>
			</BrowserRouter>
		</Provider>
  )
}

export default App;
