import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { removeCartItem } from "./cartItemSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  // console.log("this is item ----->", item);
  const handleRemoveClick = () => {
    dispatch(removeCartItem(item.id));
  };
  return (
    <Card sx={{border:'1px solid grey'}}>
      <CardContent>
        <Typography variant="h5">{item.product.name}</Typography>
        <Typography variant="body2">{item.product.description}</Typography>
        <CardMedia
          component="img"
          image={item.product.imageUrl}
          sx={{ width: "275px", height: "auto" }}
        />
        <Typography variant="h6">{`$${item.product.price}`}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleRemoveClick}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
