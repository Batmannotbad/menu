import React from "react";
import data from "./data.json";
// import { render } from "@testing-library/react";
import Products from "./components/products";
import Filter from "./components/filter"
import Cart from "./components/Cart";
// import { type } from "@testing-library/user-event/dist/type";

class App extends React.Component {
   
    constructor(){
        super ();
        this.state = {
            products: data.products,
            cartItems:localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems"))
            :[],
            type:"",
            sort:"",
        };
    }
    createOrder = (order) => {
        alert("Need to save order for " + order.name);
      };
    increItem = (product)=>{
        const cartItems = this.state.cartItems.slice();
        cartItems.forEach(item =>{
            if(item._id === product._id){
                item.count++;
            }
        });
        this.setState({cartItems})
        localStorage.setItem("cartItems",JSON.stringify(cartItems));


    };
    decreItem = (product)=>{
        const cartItems = this.state.cartItems.slice();
        cartItems.forEach(item =>{
            if(item._id === product._id){
                item.count = item.count > 1 ? item.count - 1 : 1;
            }
        });
        this.setState({cartItems})
        localStorage.setItem("cartItems",JSON.stringify(cartItems));

    };
    removeFromCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        this.setState({
          cartItems: cartItems.filter((x) => x._id !== product._id),
        });
        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems.filter((x) => x._id !== product._id))
          );
      };
    addToCart = (product)=>{
        const cartItems = this.state.cartItems.slice();
        let alreadyInCart = false;
        cartItems.forEach(item =>{
            if(item._id === product._id){
                item.count++;
                alreadyInCart = true;
            }
        });
        if(!alreadyInCart){
            cartItems.push({...product, count: 1});
        }
        this.setState({cartItems})
        localStorage.setItem("cartItems",JSON.stringify(cartItems));
    };
    sortProducts = (event) => {
        // impl
        const sort = event.target.value;
        console.log(event.target.value);
        this.setState((state) => ({
          sort: sort,
          products: this.state.products
            .slice()
            .sort((a, b) =>
              sort === "lowest"
                ? a.price > b.price
                  ? 1
                  : -1
                : sort === "highest"
                ? a.price < b.price
                  ? 1
                  : -1
                : a._id < b._id
                ? 1
                : -1
            ),
        }));
      };
    filterProducts = (event) => {
        console.log(event.target.value);
        if (event.target.value === "") {
            this.setState({ type: event.target.value, products: data.products });
        } else {
            this.setState({
                type: event.target.value,
                products: data.products.filter(
                    (product) => product.type === event.target.value
                ),
            });
        }
    };    
    render(){
        return (
            <div id="top" className="home">
                <header className="header section-divider">
                <div className="container">

                    <nav className="navbar">
                        <label
                        className="hamburger-icon"
                        aria-label="Open navigation menu"
                        htmlFor="menu-toggle"
                        ><ion-icon name="menu-outline"></ion-icon></label>

                        <input type="checkbox" id="menu-toggle" />

                        <ul className="navbar-list">
                            <li className="nav-item">
                            <a href="#home" className="navbar-link" data-nav-link>Home</a>
                            </li>

                            <li className="nav-item">
                            <a href="#about" className="navbar-link" data-nav-link>About Us</a>
                            </li>

                            <li className="nav-item">
                            <a href="#promo" className="navbar-link" data-nav-link>Shop</a>
                            </li>

                            <li className="nav-item">
                            <a href="#menu" className="navbar-link" data-nav-link>Menu</a>
                            </li>

                            <li className="nav-item">
                            <a href="#contact" className="navbar-link" data-nav-link>Contact</a>
                            </li>
                        </ul> 
                    </nav>

                    <div className="header-btn">
                        <a href="/">
                            <button className="btn">Order Here</button>
                        </a>
                    </div>
                </div>

                <div className="marquee">
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci odio, qui nam quisquam velit eos nemo doloresex laborum magni corrupti! Reprehenderit sequi!</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci odio, qui nam quisquam velit eos nemo doloresex laborum magni corrupti! Reprehenderit sequi!</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci odio, qui nam quisquam velit eos nemo doloresex laborum magni corrupti! Reprehenderit sequi!</p>
                </div>
                </header>
                <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                type={this.state.type}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products
                products={this.state.products}
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                increItem={this.increItem}
                decreItem={this.decreItem}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
                <footer>
                    <section className="footer section-divider section-padding" id="contact">
                        <div className="container">
                            <div className="grid-list">
                                <ul className="footer-list">
                                    <li>
                                        <h3 className="footer-list-title">
                                        Japanese
                                        </h3>
                                    </li>
                    
                                    <li>
                                        <p className="the-company">
                                            Specialities
                                        </p>
                                    </li>
                    
                                    <li>
                                        <p className="the-company">
                                            Weekly Promos 
                                        </p>
                                    </li>
                    
                                    <li>
                                        <p className="the-company">
                                            Stay in the loop
                                        </p>
                                    </li>
                                </ul>
                    
                                <ul className="footer-list">
                                    <li>
                                        <h3 className="footer-list-title">
                                            the team
                                        </h3>
                                    </li>
                    
                                    <li>
                                        <p className="the-team">
                                            Meet the Team
                                        </p>
                                    </li>
                    
                                    <li>
                                        <p className="the-team">
                                            Collabborations
                                        </p>
                                    </li>
                    
                                    <li>
                                        <p className="the-team">
                                            Our Specilaty Chefs
                                        </p>
                                    </li>
                                </ul>
                    
                                <ul className="footer-list">
                                    <li>
                                        <h3 className="footer-list-title">
                                            from japan
                                        </h3>
                                    </li>
                    
                                    <li>
                                        <p className="from-japan">
                                            The Cuisine
                                        </p>
                                    </li>
                    
                                    <li>
                                        <p className="from-japan">
                                            Authentic
                                        </p>
                                    </li>
                    
                                    <li>
                                        <p className="from-japan">
                                            Delicious and Healthy
                                        </p>
                                    </li>
                                </ul>
                    
                                <ul className="footer-list">
                                    <li>
                                        <h3 className="footer-list-title">
                                            legal
                                        </h3>
                                    </li>
                    
                                    <li>
                                        <p className="legal">
                                        Term & Conditoins
                                        </p>
                                    </li>
                    
                                    <li>
                                        <p className="legal">
                                            Privacy Policy
                                        </p>
                                    </li>
                    
                                    <li>
                                        <p className="legal">
                                            Copyright
                                        </p>
                                    </li>
                                </ul>
                            </div>

                        </div>

                        <div className="footer-bottom">
                            <p className="copyright">
                            </p>
                        </div>
                    </section>
                </footer>
            </div>
        );
    }
}

export default App;
