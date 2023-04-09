import React, { Component } from 'react'

export default class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-result">{this.props.count} Products</div>
        <div className="filter-sort">
          Order{" "}
          <select value={this.props.sort} onChange={this.props.sortProducts}>
            <option>Lastest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="filter-type">
            Filter{" "}
          <select value={this.props.type} onChange={this.props.filterProducts}>
              <option value="">ALL</option>
              <option value="sashimi">sashimi</option>
              <option value="sushi">sushi</option>
              <option value="bento">bento</option>
            </select>
        </div>
      </div>
    )
  }
}


