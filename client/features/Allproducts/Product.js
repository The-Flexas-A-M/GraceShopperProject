import React from "react";


function Product({product}){
return <div className="product">
    <div className="product-image">
        <img src={product.imageUrl} alt="" />
    </div>
    <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-genre">{product.genre}</p>
        <p className="product-price">{product.price}</p>
    </div>
</div>
}

export default Product