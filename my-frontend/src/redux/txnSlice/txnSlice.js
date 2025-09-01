import { createSlice } from "@reduxjs/toolkit";

export const txnSlice = createSlice({
  name: "transactions",
  initialState: {
    txn: JSON.parse(localStorage.getItem("transactions")) || [],
    toBeEditedTxn: null,
  },
  reducers: {
    addTxn: (state, action) => {
      state.txn.push(action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.txn));
    },
    deleteTxn: (state, action) => {
      console.log("action", action.payload);
      state.txn = state.txn.filter((x) => {
        return x.id !== action.payload.id;
      });
      localStorage.setItem("transactions", JSON.stringify(state.txn));
    },
    setToBeEditedTxn: (state, action) => {
      state.toBeEditedTxn = action.payload;
      console.log("state", state.toBeEditedTxn);
    },
    updateTxn: (state, action) => {
      const index = state.txn.findIndex((x) => {
        return x.id === action.payload.id;
      });
      state.txn.splice(index, 1, action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.txn));
    },
  },
});

export const { addTxn, deleteTxn, updateTxn, setToBeEditedTxn } =
  txnSlice.actions;

export default txnSlice.reducer;
