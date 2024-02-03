
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/authAPI";
// import { setIsLoggedIn } from "../slices/authSlice";
import { IoHandLeftOutline } from "react-icons/io5";
import toast from "react-hot-toast";
function HomePage() {
    const dispatch =  useDispatch()
    const {token,User} = useSelector((state)=>state.auth)

    const navigate = useNavigate()
   const handleLogout = ()=>{
       dispatch(logout(navigate))
   }
   const gotoDashboard = ()=>{
     if(!token){
      toast.error('Please login')
      navigate('/login')
      return

     }
      navigate('/profile')
   }
   console.log(User)

  return (
    <div>
            <div className=" bg-primary mx-auto px-5 h-auto d-flex  text-white py-2 px-3  justify-content-between align-content-center">
                <h4>Authentication</h4>
                {
                    token === null ?  <button type="button d-block" className="btn bg-white" onClick={()=>navigate('/login')}>Login</button>
                                       : <button type="button d-block" className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                }
               
        
            </div>

            <div className="mx-auto mt-5 d-flex flex-column justify-content-center align-items-center align-self-center">
              <h1>Hi, {User === null ? "Welcome" :User.Name}! <span className="icon-container">
                                     <IoHandLeftOutline className="icon" />
                            </span>
              </h1>
              <button className="mt-4 btn btn-primary" onClick={gotoDashboard}>Dashboard</button>
            </div>


    </div>
  )
}

export default HomePage