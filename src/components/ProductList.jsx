import React, { Component } from 'react';
import axios from 'axios';
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
    axios.get('https://apionlinedelivery-staging.mpaani.com/homedelivery/v1/retailerproduct/?storeId=23416&limit=100&offset=0', { headers: { Authorization: 'Token eb994eab6f96081200214592073027f816b1c9e5' } })
      .then(res => this.setState({ productList: res.data.results }));
  }

  handleInputChange = (e) => {
    e.preventDefault();
    const searchItem = e.target.value.toLowerCase();
    axios.get(`https://apionlinedelivery-staging.mpaani.com/homedelivery/v1/retailerproduct/?searchText=${searchItem}&limit=100&offset=0`, { headers: { Authorization: 'Token eb994eab6f96081200214592073027f816b1c9e5' } })
      .then(res => this.setState({
        productList: res.data.results,
      }));
  }

  render() {
    const { productList } = this.state;
    return (
      <div>
        <div
          style={{
            zIndex: '1', position: 'fixed', top: '0px', width: '100%',
          }}
          className="px-1 pt-1 bg-white"
        >
          <InputGroup>
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
        <div style={{ paddingTop: '50px' }}>
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
