import { createSlice, createSelector } from "@reduxjs/toolkit";
import { foodItems } from "./json";

const foodItemsSlice = createSlice({
  name: "foodItems",
  initialState: [
    ...foodItems,
    // ... (other food items)
  ],
  reducers: {
    updatePriceAndQuantity: (state, action) => {
      const { index, newPrice, newQuantity ,status} = action.payload;
      if (index >= 0 && index < state.length) {
        if (
          state[index].price !== newPrice &&
          state[index].quantity !== newQuantity
        ) {
          state[index].status = status == '' ? "Price and Quantity Updated" : status;
        } else if (state[index].price !== newPrice) {
          state[index].status = status == '' ? "Price Updated": status;
        } else if (state[index].quantity !== newQuantity) {
          state[index].status = status == '' ? "Quantity Updated":status;
        }
        state[index].price = newPrice;
        state[index].quantity = newQuantity;

        // Recalculate total based on the updated price and quantity if needed
        state[index].total = newPrice * newQuantity;

        // Update status based on changes
      }
    },
    addItem: (state, action) => {
      state.push(action.payload);
    },
    markAsAvailable: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.length) {
        state[index].status = "Available";
      }
    },
    markAsSoldOut: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.length) {
        state[index].status = "Sold Out";
      }
    },

    markAsSoldOutUrgent: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.length) {
        state[index].status = "Sold Out Urgent";
      }
    },
    updateQuantity: (state, action) => {
      const { index, newQuantity } = action.payload;
      if (index >= 0 && index < state.length) {
        const oldQuantity = state[index].quantity;

        state[index].quantity = newQuantity;

        // Recalculate total based on the updated quantity if needed
        state[index].total = state[index].price * newQuantity;

        // Update status based on quantity changes
        if (oldQuantity !== newQuantity) {
          state[index].status = "Quantity Updated";
        }
      }
    },
  },
});

export const {
  updatePriceAndQuantity,
  addItem,
  markAsAvailable,
  markAsSoldOut,
  markAsSoldOutUrgent,
  updateQuantity,
} = foodItemsSlice.actions;

// Selector function to access all state items
export const selectAllFoodItems = (state) => state.foodItems;

// Memoized selector using createSelector for better performance
export const selectAllFoodItemsMemoized = createSelector(
  selectAllFoodItems,
  (foodItems) => foodItems
);

export default foodItemsSlice.reducer;
