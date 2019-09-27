import React, { Component } from 'react';
import axios from 'axios';

class LearnReact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  handleSearch = (event) => {
    const query = event.target.value;
    axios.get(`https://apionlinedelivery-staging.mpaani.com/homedelivery/v1/retailerproduct/?searchText=${query}&limit=100&offset=0`, { headers: { Authorization: 'Token eb994eab6f96081200214592073027f816b1c9e5' } })
      .then(res => this.setState({ items: res.data.results }));
  }

  render() {
    const { items } = this.state;
    return (
      <>
        <h1 className="google-tag">Google</h1>
        <div className="google-search"><input type="search" onChange={this.handleSearch} /></div>
        {items.map(v => (
          <p className="text-success">{v.displayName}</p>
        ))}
        <div className="google-search"><button type="submit" onClick={this.handleSubmit}>Google Search</button></div>
      </>
    );
  }
}

export default LearnReact;
