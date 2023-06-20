import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartItems = createAsyncThunk(
  "cartitem/fetchCartItems",
  async (userId) => {
    try {
      const response = await axios.get(`/api/cartItems/${userId}`);
      return response.data;
    } catch (error) {
      throw Error("Failed to fetch cartItem");
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cartItems/removeCartItem",
  async ({userId, productId}) => {
    try {
      const response = await axios.delete(
        `/api/cartItems/${userId}/${productId}`
      );
      return {data: response.data, userId};;
    } catch (error) {
      throw Error("Failed to delete cartItem");
    }
  }
);

const initialState = {
  cartItem: [],
  status: "idle",
  error: null,
};

export const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.pending, (state) => {
      state.status = "loading";
    }),
      builder.addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItem = action.payload;
      }),
      builder.addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.userId = action.payload.userId; // store userId from the response
      state.cartItem = state.cartItem.filter(
        (item) => item.id !== action.payload
      );
    });
    builder.addCase(removeCartItem.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default cartItemSlice.reducer;
