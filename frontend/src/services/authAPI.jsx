import axios from "axios"

// import {setUser} from '../slices/profileSlice';
// import {setLoading, setToken, setUuid} from '../slices/authSlice'
import toast from "react-hot-toast";
import { setIsLoggedIn, setToken, setUser } from "../slices/authSlice";

// const URL ="http://localhost:3001/api/auth"
const URL = 'https://basic-auth-backend.onrender.com/api/auth'



//signup function

export function signUp( Regdata,navigate){
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    console.log("in signup function",Regdata)
    // dispatch(setLoading(true))
    try {
      const response = await axios.post(`${URL}/signup`, {
        Regdata
      })
  
      
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login") 
    } catch (error) {
      
      toast.error("Signup Failed")
      navigate("/register")
    }
    // dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}



//login function
export function login(LoginData,navigate){
  return async (dispatch)=>{
    try {
      console.log(LoginData)
        axios.post(`${URL}/login`, LoginData).then((response)=>{
        console.log(response)
        dispatch(setUser(response.data.user))
        dispatch(setToken(response.data.token))
  
        localStorage.setItem("user",JSON.stringify(response.data.user))
        localStorage.setItem("token",JSON.stringify(response.data.token))
        setIsLoggedIn(true);
        toast.success('Login Successfully.');
        navigate("/")
      }).catch(()=>{
        toast.error('invalid credential')
      })
    } catch (error) {
      toast.error('invalid credential')
      console.log(error)
    }
   

  }
    
}

export function logout(navigate){
  return async (dispatch)=>{
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    dispatch(setUser(null))
    dispatch(setToken(null))
    toast.success("logout successfully")
    navigate("/")

  }
}

export function DeleteAccount(Email,id,navigate,token){
  return async (dispatch)=>{
    try {
      const response = await axios.post(`${URL}/deleteAccount`,{Email,id},
       { headers: {
        Authorization: `Bearer ${token}`,
    }},)
      if(response.data.success){
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        dispatch(setUser(null))
        dispatch(setToken(null))
        toast.success("Account Deleted")
        navigate("/")
      }
      
    } catch (error) {
      console.log(error)
    }
    

  }
}

export function updateUser(User,token){
  return async (dispatch)=>{
    try {
      const response = await axios.post(`${URL}/updateUser`,User,{
        headers: {
          Authorization: `Bearer ${token}`,
      },
      })
      console.log(response,'response');
      if(response.data.success){
        dispatch(setUser(response.data.User))
        localStorage.setItem("user",JSON.stringify(response.data.User))    
        toast.success('Updated Successfully.'); 
        
      }
      
    } catch (error) {
      console.log(error)
    }
    
  }
}