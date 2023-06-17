import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    return [];
  };

  useEffect(() => {
    fetchCartItems().then((items) => setCartItems(items));
  }, []);


  return (
    <div>
      {cartItems.map(item => <CartItem item={item} key={item.id} />)}
    </div>
  );
};
export default Cart;
