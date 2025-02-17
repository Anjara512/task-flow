require('dotenv').config()
const jwt=require('jsonwebtoken');
const User=require('../models/schema')
const authentification=async(req,res,next)=>{

try {
 const authHeader=req.header('authorization');
 if(!authHeader) return res.status(401).json({error:"Unauthorized"})
const token=authHeader.replace("Bearer"," ").trim();
 const decoded=jwt.verify(token,process.env.SECRETE_KEY);
 const user=await User.findById(decoded.id).select("-password");
 req.user=user;
next()
}catch (error) {
 res.status(401).json({error:"Invalid token"})

 
}
}
module.exports=authentification