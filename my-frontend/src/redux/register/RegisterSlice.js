import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useNavigate } from "react-router";
import {toast} from "react-toastify"

const api_url = "http://localhost:4000";
// const navigate = useNavigate()

export const userRegistration = createAsyncThunk("userRegistration" , async(user) => {
    try{const res = await axios.post(`${api_url}/registerUser` , user);
    toast.success("Registered Successfully!!")
    return res.data;
}
    catch{
        toast.error("Something went Wrong!")
    }
})


export const  userLogin = createAsyncThunk("userLogin" , async (user ) => {
    try{const res = await axios.post(`${api_url}/loginuser` , user);
    if(res.data.token){
        localStorage.setItem("token" , res.data.token);
        toast.success("Logged In")
        return res.data.token;}
        else{
            toast.error(res.data)
        }
    }
    catch{
        toast.error("Something went Wrong!!")
    }
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