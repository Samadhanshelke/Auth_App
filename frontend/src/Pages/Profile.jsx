import { useDispatch, useSelector } from "react-redux";
import { VscEdit } from "react-icons/vsc";
import { DeleteAccount } from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditForm from "../components/EditForm";

function Profile() {
  const { User } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()
 const [edit,setEdit] = useState(false)
  const handleDelete =  ()=>{
    dispatch(DeleteAccount(User.Email,User._id,navigate))
  }
  if(edit){
    return <EditForm User={User} setEdit={setEdit}/>
  }
  return (
     
    <div className="mx-auto w-75  mt-5 d-flex flex-column justify-content-center align-items-center">
      <h1>Profile</h1>
      <div className="text-left d-flex flex-column align-items-start gap-1 border rounded-1 container mt-5 p-5">
        <h2 className="d-flex align-items-center gap-2">
          {User.Name} <VscEdit onClick={()=>setEdit(true)}/>
        </h2>
        <span>{User.Email}</span>
        <span>{User.Phone}</span>
        <span>{User.city}, {User.state}</span>
      </div>
      <button className="btn  btn-danger mt-3 align-self-start" onClick={handleDelete}>Delete Account</button>
    </div>
  );
}

export default Profile;
