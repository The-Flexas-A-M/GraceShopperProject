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
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeCartItem } from "./cartItemSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  // console.log("this is item ----->", item);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleRemoveClick = () => {
    dispatch(removeCartItem(item.id));
  };

  const handleChange = (event) => {
    setQuantity(event.target.value);
    // TODO: Dispatch action to update quantity in the cart
  };

  return (
    <Card sx={{ border: "1px solid grey" }}>
      <CardContent>
        <Typography variant="h5">{item.product.name}</Typography>
        <Typography variant="body2">{item.product.description}</Typography>
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
