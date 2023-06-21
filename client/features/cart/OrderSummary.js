import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import {clearCart} from './cartItemSlice';
import { clearGuestCart } from "./guesCartSlice";


const OrderSummary = ({ subtotal }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.me ? true : false);

  const handleCheckout = () => {
    if (isAuth) {
      dispatch(clearCart());
    } else {
      dispatch(clearGuestCart());
    }
    // Here you can also handle the process of order creation
    // then redirect user to a success page or do something else
  };
  console.log("this is subtotal---->", subtotal); // Add this line in OrderSummary component
  return (
    <Box
      sx={{
        // display: "flex",
        flexDirection: "column",
        // alignItems: "flex-start",
        justifyContent: "center",
        margin: "1rem",
        padding: "1rem",
        border: "1px solid grey",
        borderRadius: "0.5rem",
      }}
    >
      <Card sx={{ minwidth: "30%", marginTop: "1rem" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <Typography variant="body2" gutterBottom>
            Subtotal: ${subtotal.toFixed(2)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Shipping & Handling : Free
          </Typography>
          <Typography variant="body2" gutterBottom>
            Taxes: Free
          </Typography>
          <Typography variant="body1" style={{ marginTop: "1rem" }}>
            Estimated Total: ${subtotal.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ marginTop: "20px" }}
            disabled={subtotal <= 0} // Disable button if there's nothing in the cart
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderSummary;
