import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems, updateCartItem} from "../cart/cartItemSlice";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";




const Checkout = () => {
const auth = useSelector((state) => state.auth);
const user = useSelector((state) => state.auth.me);

  const userId = auth.me ? auth.me.id : null;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItem.cartItem);
  const cartStatus = useSelector((state) => state.cartItem.status);
  const error = useSelector((state) => state.cartItem.error);
//   const [quantity, setQuantity] = useState(item.quantity);
const subtotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [cartItems]);



  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [userId, dispatch]);

  return (
    <>
    <Box sx={{display:"flex"}}>
    <Box sx={{width:"70%"}}>
        <Box sx={{display:"flex", justifyContent:"space-between", marginTop:"20px", marginLeft:"20px"}}>
            <div>Shipping Address</div>
            <div>
            <div>{user.firstname + " " + user.lastname}</div>
            <div>{user.street}</div>
            <div>{user.city + ", " + user.state + " " + user.zip}</div>
            </div>
            <Button>Change</Button>
        </Box>
        <Box sx={{display:"flex", justifyContent:"space-between", marginTop:"20px", marginLeft:"20px"}}>
            <div>Payment Method</div>
            <Button>Add Payment Method</Button>
        </Box>
        <Box sx={{marginTop:"20px"}}>{cartItems && cartItems.map((item) => (
          <CartItem checkout={true} item={item} key={item.id} />
        ))}
        </Box>
    </Box>
    <Box sx={{display:"flex", justifyContent:"center", width:"30%"}}><div><OrderSummary checkout={true} subtotal={subtotal} />
</div></Box>
    </Box>
    </>
  )
}

export default Checkout