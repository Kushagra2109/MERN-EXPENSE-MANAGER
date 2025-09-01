import {configureStore } from "@reduxjs/toolkit"
import txnReducer from './txnSlice/txnSlice'

export const store = configureStore({
    reducer: {
        transactions : txnReducer,
    }
})