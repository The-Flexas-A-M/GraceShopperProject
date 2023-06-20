import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import cartItemSlice, { fetchCartItems } from "./cartItemSlice";
import CartItem from "./CartItem";
import { Box } from "@mui/material";
import OrderSummary from "./OrderSummary";

const Cart = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userId = auth.me ? auth.me.id : null;
  const cartItems = useSelector((state) => state.cartItem.cartItem);
  const cartStatus = useSelector((state) => state.cartItem.status);
  const error = useSelector((state) => state.cartItem.error);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cartItems]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    }
  }, [userId, dispatch]);

  if (!userId) {
    return <div>Loading...</div>;
  }

  if (cartStatus === "loading") {
    return <div> Loading...</div>;
  } else if (cartStatus === "failed") {
    return <div>{error}</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1rem",
      }}
    >
      <div>
        Cart Is Working
        {cartItems.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
      <OrderSummary subtotal={subtotal} />
    </Box>
  );
};
export default Cart;
