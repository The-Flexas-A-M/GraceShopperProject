import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    TextField,
    Typography,
  } from "@mui/material";
import React from 'react'

const CartItem = ({ item }) => {
  return (
    <Card>
      <CardMedia component="img" image={item.image} />
      <CardContent>
        <Typography variant="h5">{item.title}</Typography>
        <Typography variant="body2">{item.description}</Typography>
        <TextField type="number" defaultValue={item.quantity} />
        <Typography variant="h6">{`$${item.price}`}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Remove
        </Button>
      </CardActions>
    </Card>
  )
}

export default CartItem;