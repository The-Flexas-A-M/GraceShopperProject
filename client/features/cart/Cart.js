import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "./cartItemSlice";

const Cart = () => {
  const dispatch = useDispatch(); // send action to the redux store
  const userId = useSelector((state) => state.auth.id) // adjust store
  const cartItems = useSelector((state) => state.cartItem.cartItem) // access the users id from the store s
  const cartStatus = useSelector((state) => state.cartItem.status); // access cartItems from the store
  const error = useSelector((state) => state.cartItem.error); // access error messages if request for cartItems fails
  console.log(userId);
  console.log(cartItems);

  useEffect(() => {
    if (userId && cartStatus === 'idle'){
      dispatch(fetchCartItems(userId))
    }
  }, [cartStatus, dispatch,userId]);

  if (cartStatus === 'loading') {
    return <div> Loading...</div>;
  } else if (cartStatus === 'failed') {
    return <div>{error}</div>
  }


  return (
    <div>
      Cart hello its the cart here do you see me yhguyguyguyguyg
iojiojio ijoijo
      {cartItems.map(item => <CartItem item={item} key={item.id} />)}
    </div>
  );
};
export default Cart;
