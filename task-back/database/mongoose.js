require("dotenv").config()
const { default: mongoose } = require( "mongoose" )

const main=async()=>{
 try {
  await mongoose.connect(process.env.MONGO_URL);
  
 } catch (error) {
  console.error(error)
  
 }
}

module.exports=main;