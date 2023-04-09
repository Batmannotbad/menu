import React ,{Component} from 'react'

export default class Products extends Component{
    render (){
        return (
            <div>
                <ul className="products">
                    {this.props.products.map(product => (
                        <li key={product._id}>
                            <div className="product">
                                <figure className="card-banner img-holder">
                                        <img src={product.picturePath} width={250} height={250} alt={product.name} className="img-cover"></img>
                                </figure>
                                <a href={"#"+product._id}>
                                    <h3>
                                        {product.name}
                                    </h3>
                                </a>
                                <div className="product-price">
                                    <h4>
                                        {product.price + " đ"}
                                    </h4>
                                    <button onClick={()=>this.props.addToCart(product)} className="btn primary">
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}