import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "./cartItemSlice";
import CartItem from "./CartItem";
import { Box } from "@mui/material";
import OrderSummary from "./OrderSummary";
import { selectGuestCart, setGuestCartItems} from "./guesCartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userId = auth.me ? auth.me.id : null;
  const cartItems = useSelector((state) => (state.auth.me && Object.keys(state.auth.me).length > 0) ? state.cartItem.cartItem : selectGuestCart(state));  
  const error = useSelector((state) => state.cartItem.error);
  const cartStatus = useSelector((state) => state.cartItem.status);
  console.log('this is cartItems---->',cartItems);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => {
        console.log('Item:', item);
        if (item.price) {
          return acc + Number(item.price);
        } else {
          console.error('Missing price in item:', item);
          return acc;
        }
      },
      0
    );
  }, [cartItems]);
console.log("cart", cartItems)

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId));
    } else {
      const guestCart = localStorage.getItem('guestCart');
      if (guestCart) {
        dispatch(setGuestCartItems(JSON.parse(guestCart)));
      }
    }
  }, [userId, dispatch]);

  if (error) {
    return <div>{error}</div>;
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
      <Box sx={{ flexBasis: "70%", marginRight: "2rem" }}>
        Cart Is Working
        {cartItems.map((item) => (
          <CartItem checkout={false} item={item} key={item.id} />
        ))}
      </Box>
      <Box
        sx={{
          flexBasis: "30%"
        }}
      >
        <OrderSummary checkout={false} subtotal={subtotal} />
      </Box>
    </Box>
  );
};
export default Cart;
