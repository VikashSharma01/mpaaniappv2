import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      barcode: '',
      description: '',
      mrp: '',
      sellingPrice: '',
      storeId: '23416',
    };
  }

handleChange = (event) => {
  event.preventDefault();
  const { value, name } = event.target;
  this.setState({ [name]: value });
}

handleSubmit = (event) => {
  const { history } = this.props;
  event.preventDefault();
  fetch('https://apionlinedelivery-staging.mpaani.com/homedelivery/v1/retailerproduct/', { method: 'POST', body: JSON.stringify(this.state) })
    .then((responce) => {
      if (responce.ok) {
        return history.push('/');
      }
      throw new Error(responce.error);
    })
    .catch(err => (err));
}

render() {
  const {
    displayName, barcode, description, mrp, sellingPrice, storeId,
  } = this.state;
  return (
    <div className="col py-3 px-lg-5">
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control onChange={this.handleChange} name="displayName" value={displayName} required type="text" />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control onChange={this.handleChange} name="description" value={description} type="text" />
        </Form.Group>
        <Form.Group controlId="formBasicBarcode">
          <Form.Label>Barcode</Form.Label>
          <Form.Control onChange={this.handleChange} name="barcode" value={barcode} type="text" />
        </Form.Group>
        <Form.Group controlId="formBasicStoreID">
          <Form.Label>Store ID</Form.Label>
          <Form.Control readOnly onChange={this.handleChange} name="StoreId" value={storeId} type="number" />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridSelling">
            <Form.Label>Selling Price</Form.Label>
            <Form.Control onChange={this.handleChange} name="sellingPrice" value={sellingPrice} required type="number" placeholder="0" />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridMrp">
            <Form.Label>MRP</Form.Label>
            <Form.Control onChange={this.handleChange} name="mrp" value={mrp} required type="number" placeholder="0" />
          </Form.Group>
        </Form.Row>
        <Button variant="success" onClick={this.handleSubmit} type="submit">Submit</Button>
      </Form>
    </div>
  );
}
}

AddProduct.propTypes = {
  history: PropTypes.objectOf({}).isRequired,
};

export default AddProduct;
