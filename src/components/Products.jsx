import React, { Component } from 'react';
import {
  Button, Col,
  Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

class Products extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      isEditing: false,
      updateSellingPrice: {
        sellingPrice: data.sellingPrice,
      },
    };
  }

  handleEdit = () => {
    this.setState({ isEditing: true });
  }

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(prevState => (
      {
        updateSellingPrice: {
          ...prevState.updateSellingPrice,
          [name]: parseFloat(value),
        },
      }));
  }

  handleUpdate = (event) => {
    const { updateSellingPrice } = this.state;
    // const { data } = this.props;
    event.preventDefault();
    fetch('https://apionlinedelivery-staging.mpaani.com/homedelivery/v1/retailerproduct/?storeId=23416', { method: 'PATCH', headers: { Authorization: 'Token eb994eab6f96081200214592073027f816b1c9e5' }, body: JSON.stringify(updateSellingPrice) })
      .then((responce) => {
        if (responce.ok) {
          this.setState({ isEditing: false });
        }
        throw new Error(responce.error);
      })
      .catch(err => (err));
  }

  render() {
    const { data } = this.props;
    const { isEditing, updateSellingPrice } = this.state;
    return (
      <div>
        <div className="mt-3 ml-3 mr-3 d-flex justify-content-start ">
          <div>
            <img src={data.libraryProduct ? data.libraryProduct.image : 'https://static-s.aa-cdn.net/img/gp/20600005380669/ZWh6_70jMhb34dx-RbEOR36iyaza_QBjy7wGfTTLHVoSeII5sRlYuPhcK3zm3cNRdQw=s300?v=1'} style={{ height: '100px', width: '100px' }} alt="100x100" />
            {!isEditing
              && (
              <div style={{ width: '100px' }} className="mt-3">
                <Button onClick={this.handleEdit} className="w-100" variant="outline-info">&#x270E; Edit</Button>
              </div>
              )
      }
          </div>
          <div className="ml-3">
            <h6 style={{ fontSize: '0.9rem' }}><strong>{data.displayName}</strong></h6>
            <div style={{ display: 'flex' }}>
              <h6 style={{
                margin: '0', padding: '0', fontSize: '0.9rem', color: 'green',
              }}
              >
                <strong>
                  &#x20b9;
                  {' '}
                  {data.sellingPrice > 0 ? data.sellingPrice : null}
                </strong>

              </h6>
              {(data.mrp <= data.sellingPrice) ? <h6>{null}</h6> : (
                <h6 style={{ fontSize: '0.9rem', color: 'gray', marginLeft: '10px' }}>
                  <strong>
                    &#x20b9;
                    {' '}
                    {data.mrp}
                  </strong>

                </h6>
              )}
            </div>
            <div>
              <p className="p-0 m-0"><small><strong>In stock</strong></small></p>
            </div>
            <div>
              <p className="p-0 m-0"><small>{data.modifiedOn}</small></p>
            </div>
          </div>
        </div>
        {isEditing
        && (
          <div className="ml-3 mr-3 mb-6">
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridSelling">
                  <Form.Label>Selling Price</Form.Label>
                  <Form.Control onChange={this.handleChange} name="sellingPrice" value={updateSellingPrice.sellingPrice} type="number" placeholder="0" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridMrp">
                  <Form.Label>MRP</Form.Label>
                  <Form.Control readOnly defaultValue={data.mrp} onChange={this.handleChange} name="mrp" required type="number" placeholder="0" />
                </Form.Group>
              </Form.Row>
              <Button onClick={this.handleUpdate} className="w-100" variant="success" type="submit">Update & Save</Button>
            </Form>
          </div>
        )
        }
      </div>
    );
  }
}

Products.propTypes = {
  data: PropTypes.shape({
    libraryProduct: PropTypes.shape(),
    mrp: PropTypes.number.isRequired,
    modifiedOn: PropTypes.string.isRequired,
    sellingPrice: PropTypes.number.isRequired,
    displayName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};


export default Products;
