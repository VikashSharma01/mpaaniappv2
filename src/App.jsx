import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/AddProduct" component={AddProduct} />
          <Route path="/" component={ProductList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
