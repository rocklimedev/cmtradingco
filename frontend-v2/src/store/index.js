import { configureStore } from "@reduxjs/toolkit";
import { queriesApi } from "@/api/queriesApi";
export const store = configureStore({
  reducer: {
    [queriesApi.reducerPath]: queriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(queriesApi.middleware),
});

export default store;
