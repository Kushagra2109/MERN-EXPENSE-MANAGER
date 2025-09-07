import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useNavigate } from "react-router";

const api_url = "http://localhost:4000";
// const navigate = useNavigate()

export const userRegistration = createAsyncThunk("userRegistration" , async(user) => {
    const res = await axios.post(`${api_url}/registerUser` , user);
    return res.data;
})


export const  userLogin = createAsyncThunk("userLogin" , async (user ) => {
    console.log("2 , entered think of login")
    const res = await axios.post(`${api_url}/loginuser` , user);
    console.log("3 , login done", res.data)
    if(res.data.token){
        localStorage.setItem("token" , res.data.token);
    }
    return res.data.token;
})

export const registerSlice = createSlice({
    name: "register",
    initialState : {
        status: 'idle',
        user : null,
        error : null,
    },
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(userLogin.fulfilled, (state , action) => {
            state.status = "login success";
            state.error = 'null'
        })
    }
})

export default registerSlice.reducer;