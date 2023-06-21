import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, fetchCartItems, updateCartItem } from "./cartItemSlice";

const CartItem = ({ item, checkout }) => {
  const auth = useSelector((state) => state.auth);
  const userId = auth.me ? auth.me.id : null;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);



  const handleRemoveClick = () => {
    console.log('this is item product ID ----->', item.product.id);  //
    dispatch(removeCartItem({ userId: userId, productId: item.product.id }))
      .unwrap()
      .then(({ userId }) => {
        dispatch(fetchCartItems(userId)); // fetch updated cart items
      });
  };

  const handleChange = (event) => {
    setQuantity(event.target.value);
    dispatch(updateCartItem({ userId, productId: item.product.id, quantity: event.target.value }))
      .unwrap()
      .then(({ userId }) => {
        dispatch(fetchCartItems(userId)); // fetch updated cart items
      });
  };

  return (
    <Card sx={{ border: "1px solid grey" }}>
      <CardContent>
        <Typography variant="h5">{item.product.name}</Typography>
        {!checkout ?
          <Typography variant="body2">{item.product.description}</Typography>
          : <></>
        }
        <CardMedia
          component="img"
          image={item.product.imageUrl}
          sx={{ width: "300px", height: "auto" }}
        />
        <Typography variant="h6">{`$${item.product.price}`}</Typography>
      </CardContent>
      <CardActions>
        <InputLabel id="quantity-button-label">QTY</InputLabel>
        <Select
          labelId="quantity-button-label"
          id="quantity-select"
          value={quantity}
          onChange={handleChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
        <Button size="small" color="primary" onClick={handleRemoveClick}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
