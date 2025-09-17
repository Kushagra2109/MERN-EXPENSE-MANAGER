import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const api_url = import.meta.env.VITE_API_URI;

// const navigate = useNavigate()

export const userRegistration = createAsyncThunk(
  "userRegistration",
  async (user) => {
    try {
      const res = await axios.post(`${api_url}/registerUser`, user);
      toast.success("Registered Successfully!!");
      return res.data;
    } catch {
      toast.error("Something went Wrong!");
    }
  }
);

export const userLogin = createAsyncThunk("userLogin", async (user) => {
  try {
    const res = await axios.post(`${api_url}/loginuser`, user);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      toast.success("Logged In");
      return res.data.token;
    } else {
      toast.error(res.data);
    }
  } catch {
    toast.error("Something went Wrong!!");
  }
});

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (emailObj) => {
    try {
      const res = await axios.post(`${api_url}/forgotPassword`, emailObj);
      toast.success("Password Reset link sent to Your Email!");
    } catch (error) {
      toast.error("Something went Wrong!!");
    }
  }
);

export const verifytoken = createAsyncThunk("verifytoken", async (token) => {
  try {
    const result = await axios.get(`${api_url}/reset-password/${token}`);
    return true;
  } catch {
    return false;
  }
});

export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (updatedPasswordObj) => {
    try {
      const result = await axios.post(
        `${api_url}/updatePassword/${updatedPasswordObj.token}`,
        { password: updatedPasswordObj.password }
      );
      toast.success(result.data.message)
      return true;
    } catch (error) {
        toast.error("Something Went Worng!!")
        return false;
    }
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    status: "idle",
    user: null,
    error: null,
    tokenValid: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.status = "login success";
      state.error = "null";
    });
    builder.addCase(verifytoken.fulfilled, (state, action) => {
      state.tokenValid = action.payload;
      console.log(state.tokenValid, "from fullfilled");
    });
    // builder.addCase(verifytoken.rejected , (state , action) => {
    //     state.tokenValid = false
    //     console.log(state.tokenValid , "from rejected ")
    // })
  },
});

export default registerSlice.reducer;
