import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/authSlice";
import { updateUser } from "../services/authAPI";

  function EditForm({User,setEdit}) {
    const {Name,Email,Phone,city,state} = User

   const {token} =  useSelector((state) => state.auth)
   const dispatch = useDispatch()

  const updatedUser = User
  console.log(updatedUser,'updateduser')
  const handleSubmit = (e)=>{
     e.preventDefault();
     if(Name === "" || Email === "" || Phone === "" || city === "" || state  === ""){
       return
      }
    
       dispatch(updateUser(User,token))
       setEdit(false)
       
   }
  
    return (
      <div className="form-bg overflow-hidden">
          <form className="w-75 py-4 bg-white rounded overflow-hidden" onClick={()=>handleSubmit}>
                <h1 className="text-center">Update Details</h1>
                    <div className="row justify-content-center align-items-center overflow-hidden">
                      <div className="col-md-6 g-4">
                        <label htmlFor="validationDefault01" className="form-label">Name</label>
                        <input type="text" className="form-control mb-3" id="validationDefault01" value={Name} onChange={(e)=>dispatch(setUser({...User,Name:e.target.value}))} required/>
              
                      
              
                        <label htmlFor="validationDefaultUsername" className="form-label">Email</label>
                        <input type="email" value={Email} className="form-control mb-3" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" onChange={(e)=>dispatch(setUser({...User,Email:e.target.value}))} required/>
                       
                        <label htmlFor="validationDefaultUsername" className="form-label">Phone</label>
                        <input type="tel" value={Phone} className="form-control mb-3" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" onChange={(e)=>dispatch(setUser({...User,Phone:e.target.value}))} required/>
          
                       
              
                        <label htmlFor="validationDefault03" className="form-label">City</label>
                        <input type="text" value={city} className="form-control mb-3 " id="validationDefault03" onChange={(e)=>dispatch(setUser({...User,city:e.target.value}))} required/>
              
                        <label htmlFor="validationDefault03" className="form-label">State</label>
                        <input type="text" value={state} className="form-control mb-3" id="validationDefault03" onChange={(e)=>dispatch(setUser({...User,state:e.target.value}))} required/>
              

              
              
                        <div className="text-center mt-3">
                          <button className="btn btn-primary" type="button" onClick={handleSubmit}>Submit form</button>
                        </div>
                      </div>
                    </div>
          </form>
      </div>
     
    );
  }
  
  export default EditForm;
