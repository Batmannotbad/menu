import React ,{Component} from 'react';
import Modal from 'react-modal';
import { Zoom } from 'react-reveal';
export default class Products extends Component{
    constructor(props){
        super(props);
        this.state = {
            product: null
        };
    }
    openModal =(product) =>{
        this.setState({product});
    }
    closeModal =() =>{
        this.setState({product:null })
    }
    render (){
        const {product} = this.state;
        return (
            <div>
                <ul className="products">
                    {this.props.products.map(product => (
                        <li key={product._id}>
                            <div className="product">
                                <figure className="card-banner img-holder">
                                        <img src={product.picturePath} width={250} height={250} alt={product.name} className="img-cover"></img>
                                </figure>
                                <a href={"#"+product._id}
                                 onClick={()=>this.openModal(product)}
                                 >
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
                {
                    product && (
                        <Modal isOpen = {true}
                        onRequestClose={this.closeModal}>
                           <Zoom>
                            <button className='btn close-modal' onClick={this.closeModal}>x</button>
                            <div className='product-detail'>
                                <img src={product.picturePath} alt={product.name}></img>
                                <div className='desc'>
                                    <p>
                                        <strong>{product.name}</strong>
                                    </p>
                                    <p>
                                        {product.desc}
                                    </p>
                                    <p>
                                        Type:
                                        {" "+ product.type} 
                                    </p>
                                    <div className='product-price'>
                                        <div>
                                            Price: 
                                            {" "+product.price+" đ"}
                                        </div>
                                        <button className='btn primary' onClick={() =>{
                                            this.props.addToCart(product);
                                            this.closeModal();

                                        }}>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                            </Zoom>     
                        </Modal>
                    )
                }
            </div>
        )
    }
}