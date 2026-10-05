import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPackage: null,

  travelDates: {
    startDate: "",
    endDate: ""
  },

  travelers: 1,

  cartItems: []
};

const bookingSlice = createSlice({
  name: "booking",

  initialState,

  reducers: {
    setSelectedPackage: (state, action) => {
      state.selectedPackage = action.payload;
    },

    setTravelDates: (state, action) => {
      state.travelDates = action.payload;
    },

    setTravelers: (state, action) => {
      state.travelers = action.payload;
    },

    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    }
  }
});

export const {
  setSelectedPackage,
  setTravelDates,
  setTravelers,
  addToCart,
  removeFromCart,
  clearCart
} = bookingSlice.actions;

export default bookingSlice.reducer;