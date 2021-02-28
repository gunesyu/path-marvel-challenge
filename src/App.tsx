import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css';

import Details from './pages/Details';
import List from './pages/List'

function App() {
  return (
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
  )
}

export default App;
