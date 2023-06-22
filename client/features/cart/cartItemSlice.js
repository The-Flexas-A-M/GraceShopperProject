import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
  "cartItems/addToCart",
  async ({userId, productId}) => {
    try {
      const response = await axios.post(`/api/cartItems/${userId}`, { productId, userId });
      return response.data;
    } catch (error) {
      throw Error("Failed to add item to cart");
    }
  }
);


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

export const updateCartItem = createAsyncThunk(
  'cartItems/updateCartItem',
  async ({userId, productId, quantity}) => {
    try {
      const response = await axios.put(
        `api/cartItems/${userId}/${productId}`,
        {quantity}
      );
      return {data: response.data, userId };
    } catch (error) {
      throw Error("Failed to update carItem")
    }
  }
)

export const clearCart = createAsyncThunk(
  "cartItems/clearCart",
  async (userId) => {
    try {
      const response = await axios.delete(`/api/cartItems/${userId}`);
      return userId;
    } catch (error) {
      throw Error("Failed to clear cart");
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
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.cartItem = [...state.cartItem, action.payload];
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
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
    builder.addCase(updateCartItem.fulfilled, (state,action) => {
      state.status = "succeeded";
      const index = state.cartItem.findIndex((item) => item.id === action.payload);
      if (index !== -1 ) {
        state.cartItem[index] = action.payload
      }
    });
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(clearCart.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.cartItem = [];
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default cartItemSlice.reducer;
