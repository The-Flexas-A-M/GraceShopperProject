import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";

import { Link } from "react-router-dom";

const OrderSummary = ({ subtotal, checkout }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        margin: "1rem",
        padding: "1rem",
        border: "1px solid grey",
        borderRadius: "0.5rem",
      }}
    >
      <Card sx={{ width: { xs: "150px", md: "400px" }, marginTop: "1rem" }}>
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
          <Link to={checkout ? "/complete" : "/checkout"}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ marginTop: "20px" }}
              disabled={subtotal <= 0} // Disable button if there's nothing in the cart
            >
              {checkout ? "Submit" : "Checkout"}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderSummary;
