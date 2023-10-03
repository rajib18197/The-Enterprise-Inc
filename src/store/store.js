import { configureStore } from "@reduxjs/toolkit";
import homesReducer from "../features/vacationHomes/homesSlice";

const store = configureStore({
  reducer: {
    homes: homesReducer,
  },
});

export default store;
