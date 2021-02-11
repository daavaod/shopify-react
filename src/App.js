import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Cart from './components/Cart';
import NavBar from './components/NavBar';

import HomePage from './pages/Home'
import ProductPage from './pages/ProductPage'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Cart />
        <Switch>
          <Route path="/products/:handle">
            <ProductPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <p>Footer Here</p>
      </Router>
    </div>
  );
}

export default App;
