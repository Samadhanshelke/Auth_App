import { useDispatch, useSelector } from "react-redux";
import { setRegData } from "../slices/authSlice";
import { signUp } from "../services/authAPI";


import { useNavigate } from "react-router-dom";
  function Register() {
   const {Regdata} =  useSelector((state)=>state.auth)
   const dispatch = useDispatch()
   const navigate= useNavigate()
   const {Name,Email,Password,Phone,city,state} = Regdata;

   const handleSubmit = (e)=>{
    if(Name =="" || Email == "" || Password == "" || Phone == "" || city == "" || state  == ""){
       return
    }
       e.preventDefault();
       dispatch(signUp(Regdata,navigate))
   }
  
    return (
      <div className="form-bg overflow-hidden">
          <form className="w-75 py-4 bg-white rounded overflow-hidden" onSubmit={handleSubmit}>
                <h1 className="text-center">Register Now</h1>
                    <div className="row justify-content-center align-items-center overflow-hidden">
                      <div className="col-md-6 g-4">
                        <label htmlFor="validationDefault01" className="form-label">Name</label>
                        <input type="text" className="form-control mb-3" id="validationDefault01" value={Name} onChange={(e)=>dispatch(setRegData({...Regdata,Name:e.target.value}))} required/>
              
                      
              
                        <label htmlFor="validationDefaultUsername" className="form-label">Email</label>
                        <input type="email" value={Email} className="form-control mb-3" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" onChange={(e)=>dispatch(setRegData({...Regdata,Email:e.target.value}))} required/>
                       
                        <label htmlFor="validationDefaultUsername" className="form-label">Phone</label>
                        <input type="tel" value={Phone} className="form-control mb-3" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" onChange={(e)=>dispatch(setRegData({...Regdata,Phone:e.target.value}))} required/>
                        
                        <label htmlFor="validationDefaultUsername" className="form-label">Password</label>
                        <input  type="password" value={Password} className="form-control mb-3" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" onChange={(e)=>dispatch(setRegData({...Regdata,Password:e.target.value}))} required/>
                       
              
                        <label htmlFor="validationDefault03" className="form-label">City</label>
                        <input type="text" value={city} className="form-control mb-3 " id="validationDefault03" onChange={(e)=>dispatch(setRegData({...Regdata,city:e.target.value}))} required/>
              
                        <label htmlFor="validationDefault03" className="form-label">State</label>
                        <input type="text" value={state} className="form-control mb-3" id="validationDefault03" onChange={(e)=>dispatch(setRegData({...Regdata,state:e.target.value}))} required/>
              

              
              
                        <div className="text-center mt-3">
                          <button className="btn btn-primary" type="submit">Submit form</button>
                        </div>
                      </div>
                    </div>
          </form>
      </div>
     
    );
  }
  
  export default Register;
