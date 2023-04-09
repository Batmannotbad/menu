import React, { Component } from "react";
// import formatCurrency from "../util";

export default class Cart extends Component {
  render() {
    const { cartItems } = this.props;
    console.log('cartItems:', this.props.cartItems);
    console.log('cart:', this.props.cart);
    console.log('updateCart:', this.props.updateCart);
    console.log('increItem:', this.props.increItem);
    console.log('decrementItem:', this.props.decrementItem);
    console.log('removeFromCart:', this.props.removeFromCart);
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}
        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div className="productInfo">
                    <div>
                      <img src={item.picturePath} alt={item.name}></img>
                    </div>
                    <div className="info">
                      <div>{item.name}</div>
                      <div>
                            {item.price + " đ"}
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* <div>{item.name}</div> */}
                    <div className="right">
                      {/* <div>
                        {item.price + " đ"}
                      </div> */}
                      <div className="itemCount">
                        <button className="btn"
                        onClick={()=> this.props.decreItem(item)}>
                          -
                        </button>
                        <span> {item.count} </span>
                        <button className="btn"
                        onClick={()=> this.props.increItem(item)}>
                          +
                        </button>
                      </div>
                      <button
                        className="btn"
                        onClick={() => this.props.removeFromCart(item)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
            <div className="cart">
              <div className="total">
                <div>
                  Total: {" "}
                  {
                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                  }
                  {" đ"}
                </div>
                </div>
                <button className="btn primary">Proceed</button>
              </div>
          )}
        </div>
      </div>
    );
  }
}