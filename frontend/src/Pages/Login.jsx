import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLoginData } from "../slices/authSlice";
import { login } from "../services/authAPI";

// import { getFirestore, collection, addDoc } from 'firebase/firestore';

// import { useNavigate } from "react-router-dom";
  function Login() {
   const {LoginData} =  useSelector((state)=>state.auth)
   
   const dispatch = useDispatch()
   const navigate= useNavigate()
   const {Email,Password} = LoginData;
   const handleSubmit = (e)=>{
        e.preventDefault();
        if(Email == "" || Password == ""){
          return
        }
        dispatch(login(LoginData,navigate))
   }
 
    return (
      <div className="form-bg">
          <form className="container w-75 py-4 bg-white rounded" onSubmit={handleSubmit}>
                <h1 className="text-center">Login Now</h1>
                    <div className="row justify-content-center align-items-center ">
                      <div className="col-md-6 g-4">
                       
                        <label htmlFor="validationDefaultUsername" className="form-label">Email</label>
                        <input type="email" value={Email} className="form-control mb-3" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" onChange={(e)=>dispatch(setLoginData({...LoginData,Email:e.target.value}))} required/>
                    
                        <label htmlFor="validationDefaultUsername" className="form-label">Password</label>
                        <input  type="password" value={Password} className="form-control mb-3" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" onChange={(e)=>dispatch(setLoginData({...LoginData,Password:e.target.value}))} required/>
                        <Link to={'/register'} className="text-success">Don&apos;t  have an account Register</Link>
                      
                        <div className="text-center mt-3">
                          <button className="btn btn-primary" type="submit">Login</button>
                        </div>
                      </div>
                    </div>
          </form>
      </div>
     
    );
  }
  
  export default Login;
