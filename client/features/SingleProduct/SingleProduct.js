import React, {useEffect, useState} from "react";
import axios from "axios";

function SingleProduct() {
    const [product, setProduct] = useState({})

    async function fetchProduct() {
        let response = await axios.get("/api/products/"+
        window.location.pathname.split("/")[2])

        setProduct(response.data)
    }

    useEffect(()=>{
        fetchProduct()
    }, [])

    return (
        <div className="single-product">
            <h1>{product.name}</h1>
            <div className="single-product-main">
                <img src={product.imageUrl}></img>
                <div className="single-product-info">
                    <p>Description:{product.description}</p>
                    <h3>Genre:{product.genre}</h3>
                <div className="single-product-buy">
                    <p className="single-product-price">${product.price}</p>
                    <button className="add-to-cart">Add to Cart</button>
                </div>
                </div>
            </div>
        </div>
    )

    
}
export default SingleProduct