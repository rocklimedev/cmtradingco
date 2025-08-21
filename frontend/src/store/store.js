import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "../api/categoryApi";
import { productApi } from "../api/productApi";
import { contactApi } from "../api/contactApi";
export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryApi.middleware,
      productApi.middleware,
      contactApi.middleware
    ),
});

export default store;
