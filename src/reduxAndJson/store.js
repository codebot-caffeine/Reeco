import { configureStore } from '@reduxjs/toolkit';
import foodItemsReducer, { updatePriceAndQuantity, addItem, selectAllFoodItems } from './foodItems';

const store = configureStore({
  reducer: {
    foodItems: foodItemsReducer,
  },
});

export default store;