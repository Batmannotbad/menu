import React, { Component } from "react";
// import formatCurrency from "../util";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      address: "",
      note:"",
      name:"",
      showCheckout: false,
    };
  }
  handleFormSubmit = (values) => {
    const order = {
      name: values.name,
      phone: values.phone,
      address: values.address,
      note: values.note,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
  };
  // handleInput = (e) => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };
  
  createOrder = (values, { resetForm }) => {
    const order = {
      name: values.name,
      phone: values.phone,
      address: values.address,
      note: values.note,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
    resetForm();
    this.setState({ showCheckout: false });
  };
  render() {
    const { cartItems } = this.props;
    const initialValues = {
      name: "",
      phone: "",
      address: "",
      note: "",
    };
    
    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Required"),
      phone: Yup.string()
        .required("Required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits"),
      address: Yup.string().required("Required"),
      note: Yup.string(),
    });
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
                    <div>{item.price + " đ"}</div>
                  </div>
                </div>
                <div>
                  <div className="right">
                    <div className="itemCount">
                      <button
                        className="btn"
                        onClick={() => this.props.decreItem(item)}
                      >
                        -
                      </button>
                      <span> {item.count} </span>
                      <button
                        className="btn"
                        onClick={() => this.props.increItem(item)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="btn"
                      onClick={() => this.props.removeFromCart(item)}
                    >
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
                Total:{" "}
                {cartItems.reduce((a, c) => a + c.price * c.count, 0)} {" đ"}
              </div>
            </div>
            <button
              onClick={() => {
                this.setState({ showCheckout: true });
              }}
              className="btn primary"
            >
              Proceed
            </button>
          </div>
        )}
        </div>
        {this.state.showCheckout && (
    <div className="cart">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.createOrder}
      >
        {({ errors, touched }) => (
          <Form className="checkoutForm">
            <div>
              <label>Name</label>
              <Field
                name="name"
                placeholder="Enter your name"
                className={errors.name && touched.name ? 'error' : null}
              />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div>
              <label>Phone</label>
              <Field
                name="phone"
                placeholder="Enter your phone number"
                className={errors.phone && touched.phone ? 'error' : null}
              />
              <ErrorMessage name="phone" component="div" className="error-message" />
            </div>

            <div>
              <label>Address</label>
              <Field
                name="address"
                placeholder="Enter your address"
                className={errors.address && touched.address ? 'error' : null}
              />
              <ErrorMessage name="address" component="div" className="error-message" />
            </div>

            <div>
              <label>Note</label>
              <Field
                name="note"
                placeholder="Add a note for your order (optional)"
                as="textarea"
              />
            </div>

            <button type="submit" className="btn primary">
              Place Order
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )}
    </div>
  );
  }
  }