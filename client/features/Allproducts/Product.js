import React from "react";
import { Link } from "react-router-dom";


function Product({product}){
return <div className="product">
    <Link to={"/products/"+product.id}>
    <div className="product-image">
        <img src={product.imageUrl} alt="" />
    </div>
    <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">Description:{product.description.slice(0 ,210)}...</p>
        <p className="product-genre">Genre:{product.genre}</p>
       <div className="product-buy">
       <p className="product-price">${product.price}</p>
       <button className="add-to-cart">Add to Cart</button>
       </div>
    </div>
    </Link>
</div>
}

export default Product