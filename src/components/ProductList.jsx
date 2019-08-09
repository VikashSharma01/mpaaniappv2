import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
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

  handleInputChange = (e) => {
    e.preventDefault();
    const searchItem = e.target.value.toLowerCase();
    fetch(`https://apionlinedelivery-staging.mpaani.com/homedelivery/v1/retailerproduct/?searchText=${searchItem}&limit=100&offset=0`)
      .then(data => data.json())
      .then(data => this.setState({
        productList: data.results,
      }));
  }

  render() {
    const { productList } = this.state;
    return (
      <div>
        <div
          style={{
            zIndex: '1', position: 'fixed', top: '0px', width: '97%',
          }}
          className="ml-1"
        >
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text style={{ backgroundColor: 'white' }} id="basic-addon1">search</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              onChange={this.handleInputChange}
              placeholder="Product Name"
              aria-label="Search"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
        <Link
          to="/AddProduct"
          style={{
            width: '100%', bottom: '75px', textAlign: 'center', position: 'fixed', zIndex: '1',
          }}
        >
          <Button variant="success" type="submit">&#x271A; Add Product</Button>
        </Link>
        <div style={{ position: 'relative', top: '50px' }}>
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
