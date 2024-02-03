const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


dotenv.config();


exports.signUp = async(req,res)=>{
     try {
       const {Regdata} = req.body;
       console.log('req+body',Regdata)
       const {Name,Email,Password,city,state,Phone} = Regdata;
    console.log(Name,Email)
     if(!Name || !Email || !Password || !city || !state || !Phone){
       return res.status(400).json({
            success:false,
            message:"All field are required"
        })
     }
     const UserExist = await User.findOne({Email});
    //  console.log(UserExist)
     if(UserExist){
       return res.status(400).json({
            success:false,
            message:"you are already registered, please login"
        })
     }
 

     const hashedPassword = await bcrypt.hash(Password,10);

     const user = await User.create({
        Name,
        Email,
        Phone,
        Password:hashedPassword,
        city:city,
        state:state,
     })
      
     return res.status(200).json({
        success:true,
        message:"user registered successfully",
        user:user
     });
     } catch (error) {
        return res.status(500).json({
            success: false,
            message: "usser cannot be registered, please try again later",
          });
     }
   
}

exports.login = async(req,res)=>{
    try {
      console.log(req.body)
        // const {LoginData} = req.body;    
        const {Email,Password} = req.body;
    if(!Email || !Password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }
    const user = await User.findOne({Email});
   
    if(!user){
        return res.status(400).json({
            success:false,
            message:"please registered first",
        })
    }
     
    if(await bcrypt.compare(Password,user.Password)){
       console.log(user.Email,user._id)
        const payload = {
            Email: user.Email,
            id: user._id
          };
          
          const token = jwt.sign(payload, process.env.JWTSECRET, {
            expiresIn: "24h",
          });
         
          user.token = token;
          user.Password = undefined;
          //create cookies and send response
          const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          };
    
          res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "Logged in successfully",
          });
      
        

    }
    else{
        return res.status(401).json({
            success:False,
            message:"please fill out correct data"
        })
    }
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"something went wrong"
        })
    }
    
}

exports.deleteAccount = async(req,res)=>{
  try {
    const {Email,id} = req.body;
    if(!Email){
      return res.json({
        success:false,
        message:"Email not found"
      })
    }
    const userExists = await User.findById(id);
    if(!userExists){
      return res.json({
        success:false,
        message:"Email not found"
      })
    }
    const deleteAccount = await User.findByIdAndDelete(id)
    return res.json({
      success:true,
      message:"Account deleted",
      deleteAccount
    })
  } catch (error) {
    return res.json({
      success:false,
      message:"error in deleting account"
    })
  }
}

exports.updateUser = async(req,res)=>{
      try {
        console.log(req.body)
        const {Name,Email,Phone,city,state,_id} = req.body;
        if(!Name || !Email || !Phone || !city || !state || !_id){
          return res.json({
            success:false,
            message:"ALL fields required",
          })
        }
      
         const userExists = await User.findById(_id);
         if(!userExists){
          return res.json({
            success:false,
            message:"user not found",
          })
         }
         const updatedUser = await User.findByIdAndUpdate(_id,{
             Name,
             Email,
             Phone,
             city,
             state
         },{new:true})

          updatedUser.Password = "";
          
         return res.json({
          success:true,
          message:"user updated successfully",
          User:updatedUser
         })

      } catch (error) {
        return res.json({
          success:false,
          message:"error in updating user",
        })
      }
}
