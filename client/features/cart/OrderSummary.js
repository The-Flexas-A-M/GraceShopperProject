import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

const OrderSummary = () => {
  return (
    <Card sx={{ width: "30%", marginTop: "1rem" }}>
      <CardContent>
        <Typography variant="h6">Order Summary</Typography>
        <Typography variant="body2">Subtotal: $0.00</Typography>
        <Typography variant="body2">Shipping & Handling : Free</Typography>
        <Typography variant="body2">Taxes: Free</Typography>
        <Typography variant="body1" style={{ marginTop: "1rem" }}>
          Estimated Total: $0.00
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
