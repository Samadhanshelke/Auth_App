import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Regdata:{
     Name:"",
     Email:"",
     Password:"",
     city:"",
     state:"",
     Phone:""
  },
  LoginData:{
    Email:"",
    Password:""
  },
  isLoggedIn:false,
  User: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRegData: (state,action) => {
        state.Regdata = action.payload;
    },
    setLoginData:(state,action)=>{
        state.LoginData = action.payload;
    },
    setIsLoggedIn:(state,action)=>{
        state.isLoggedIn = action.payload;
    },
    setUser:(state,action)=>{
      state.User = action.payload
    },
    setToken:(state,action)=>{
      state.token = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setRegData,setLoginData,setIsLoggedIn,setUser,setToken} = authSlice.actions

export default authSlice.reducer