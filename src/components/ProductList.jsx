import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Products from './Products';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
    };
  }

  componentDidMount() {
    fetch('https://apionlinedelivery-staging.mpaani.com/homedelivery/v1/retailerproduct/?limit=100&offset=0', { method: 'GET' })
      .then(data => data.json())
      .then(data => this.setState({ productList: data.results }))
      .catch(err => (err));
  }

  render() {
    const { productList } = this.state;
    return (
      <div>
        <Link
          to="/AddProduct"
          style={{
            width: '100%', top: '450px', textAlign: 'center', position: 'fixed', zIndex: '1',
          }}
        >
          <Button variant="success" type="submit">&#x271A; Add Product</Button>
        </Link>
        <div>
          {productList.map(items => (
            <Products
              data={items}
              key={items.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
