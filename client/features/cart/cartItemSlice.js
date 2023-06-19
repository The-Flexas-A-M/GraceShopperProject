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
  'cartitem/removeCartitem',
  async (itemId, {rejectWithValue}) => {
    try {
      await axios.delete(`/api/carItems/${itemId}`)
      return itemId;
    } catch (error) {
      return rejectWithValue(error.message);
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
        state.cartItem = state.carItem.filter(item => item.id !== action.payload);
      });
      builder.addCase(removeCartItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default cartItemSlice.reducer;
