import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "../api/categoryApi";
import { productApi } from "../api/productApi";
export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      productApi.middleware
    ),
});

export default store;
