const { default: mongoose } = require( "mongoose" )

require("dotenv").config()
const main=async()=>{
 try {
  await mongoose.connect(process.env.MONGO_URL);
  
 } catch (error) {
  console.error(error)
  
 }
}

module.exports=main;