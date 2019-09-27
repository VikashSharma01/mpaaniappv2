import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import LearnReact from './components/LearnReact';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/AddProduct" component={AddProduct} />
          <Route path="/learn-react" component={LearnReact} />
          <Route path="/" component={ProductList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
