import React, {useEffect} from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./productSlice";


export default function AllProducts () {
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProducts())
    }, [])
    return (

        <div className="products">
            {products.map(product => <Product product={product}/>)}
        </div>


    )
}