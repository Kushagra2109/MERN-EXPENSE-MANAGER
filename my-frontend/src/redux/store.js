import { configureStore } from "@reduxjs/toolkit";
import txnReducer from "./txnSlice/txnSlice";
import registerReducer from './register/RegisterSlice';

export const store = configureStore({
  reducer: {
    transactions: txnReducer,
    register : registerReducer,
  },
});
