import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../cartItemSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems} from "../cart/cartItemSlice";
import { addToGuestCart } from "../cart/guesCartSlice";



function Product({product}){
    const auth = useSelector((state) => state.auth);
    const userId = auth.me ? auth.me.id : null;
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("userID", userId)
      }, [userId])

    const handleAddClick=() => {
        if (userId) {
        // console.log("productID", product.id)
        dispatch(addToCart({userId: userId, productId: product.id}))
    .unwrap()
    .then(({ userId }) => {
      dispatch(fetchCartItems(userId)); // fetch updated cart items
    });
} else {
    dispatch(addToGuestCart(product));
  }
}

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
       </div>
    </div>
    </Link>
       <button className="add-to-cart" onClick={handleAddClick}>Add to Cart</button>
</div>
}

export default Product

