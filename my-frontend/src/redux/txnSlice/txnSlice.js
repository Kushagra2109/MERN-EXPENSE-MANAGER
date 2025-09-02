import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api_url = "http://localhost:4000";

///////////////// post / add api
export const addTxn = createAsyncThunk("addTxn", async (txn) => {
  try {
    // console.log(txn)
    const res = await axios.post(`${api_url}/addtxn`, txn);
    return res.data;
  } catch (err) {
    console.log(err);
  }
});
//////////////

////////// get / fetch txns api
export const getTxn = createAsyncThunk("getTxn", async () => {
  console.log("entered get");
  const res = await axios.get(`${api_url}/gettxns`);
  // console.log("firstt?" , res )
  return res.data;
});
///////////

//////// put/ update api
export const updateTxn = createAsyncThunk("updateTxn", async (txn) => {
  console.log(txn, "ffffffffff");
  const res = await axios.put(`${api_url}/updatetxn/${txn._id}`, txn);
  console.log(res.data, "ffffffffff");
  return res.data;
});
//////////////////

///////////// delete api
export const deleteTxn = createAsyncThunk("deleteTxn", async (id) => {
  const res = await axios.delete(`${api_url}/deletetxn/${id}`);
  // console.log(res.data , "delete from delte")
  return res.data;
});
//////////////////

export const txnSlice = createSlice({
  name: "transactions",
  initialState: {
    txn: [],
    toBeEditedTxn: null,
    status: null,
  },
  _extraReducers: (builder) => {
    builder.addCase(addTxn.fulfilled, (state, action) => {
      state.txn.push(action.payload);
    });

    builder.addCase(getTxn.fulfilled, (state, action) => {
      state.txn = action.payload;
    });

    builder.addCase(updateTxn.fulfilled, (state, action) => {
      console.log(action.payload);
      const index = state.txn.findIndex((x) => {
        return x._id === action.payload._id;
      });
      state.txn.splice(index, 1, action.payload);
    });

    builder.addCase(deleteTxn.fulfilled, (state, action) => {
      console.log("ppppppp", action.payload);
      const index = state.txn.findIndex((x) => {
        return x._id === action.payload._id;
      });
      state.txn.splice(index, 1);
    });
  },
  get extraReducers() {
    return this._extraReducers;
  },
  set extraReducers(value) {
    this._extraReducers = value;
  },
  reducers: {
    // addTxn: (state, action) => {
    //   state.txn.push(action.payload);
    //   localStorage.setItem("transactions", JSON.stringify(state.txn));
    // },
    // deleteTxn: (state, action) => {
    //   console.log("action", action.payload);
    //   state.txn = state.txn.filter((x) => {
    //     return x.id !== action.payload.id;
    //   });
    //   localStorage.setItem("transactions", JSON.stringify(state.txn));
    // },
    setToBeEditedTxn: (state, action) => {
      state.toBeEditedTxn = action.payload;
      console.log("state", state.toBeEditedTxn);
    },
    // updateTxn: (state, action) => {
    //   const index = state.txn.findIndex((x) => {
    //     return x.id === action.payload.id;
    //   });
    //   state.txn.splice(index, 1, action.payload);
    //   localStorage.setItem("transactions", JSON.stringify(state.txn));
    // },
  },
});

export const { setToBeEditedTxn } = txnSlice.actions;

export default txnSlice.reducer;
