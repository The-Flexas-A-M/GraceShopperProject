import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "./cartItemSlice";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch(); 
  const auth = useSelector((state) => state.auth);
  const userId = auth.me ? auth.me.id : null; 
  const cartItems = useSelector((state) => state.cartItem.cartItem); 
  const cartStatus = useSelector((state) => state.cartItem.status); 
  const error = useSelector((state) => state.cartItem.error); 

  // console.log("this is auth----->", auth); // test
  // console.log("this is user id---->", userId); // test
  // console.log("this is carItems---->", cartItems); // test

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId)).then((resultAction) => {
        // console.log("fetchCartItems result---->", resultAction.payload);
      });
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
    <div>
      Cart Is Working
      {cartItems.map((item) => (
        <CartItem item={item} key={item.id} />
      ))}
    </div>
  );
};
export default Cart;
