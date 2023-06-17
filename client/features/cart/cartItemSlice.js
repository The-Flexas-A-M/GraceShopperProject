import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItem = createAsyncThunk(
  "cartitem/fetchCartItem",
  async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}/cartItems`);
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch cartItem");
    }
  }
);

const initialState = {
  carItem: [],
  status: "idle",
  error: null,
};

export const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartItem.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchCartItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.carItem = action.payload;
      }),
      builder.addCase(fetchCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cartItemSlice.reducer;
