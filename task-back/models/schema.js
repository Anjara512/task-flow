const { default: mongoose } = require( "mongoose" );

const bcrypt=require('bcryptjs');


const imageSchema=new mongoose.Schema({

    data:Buffer,
    contentType:String
  
})

const TaskSchema=new mongoose.Schema({
 content:{
  required:true,
  type:String
 },
 DateToCreate:{
  type:String
 },
 TimeToCreate:{
  type:String
 },
  complete:{
  type:Boolean
 }
});
const dateSchema=new mongoose.Schema({
  person:{
   type:String,
   required:true
  },
  motif:{
    type:String,
    required:true
  },
  lieu:{
    type:String
  },
 date:{
  type:String,
  
 },
 heurre:{
  type:String
 },
 createdAt:{
  type:String
 }
})

const noteSchema=new mongoose.Schema({
 content:{
  type:String,
  required:true
 },
 createdAt:{
  type:String
 },
 image:imageSchema
})

const userSchema=new mongoose.Schema({
 email:{
  unique:true,
  required:true,
  type:String
 },
 password:{
  type:String,
  required:true
 },
 name:{
  type:String
 },
 sexe:{
  type:String

 },
 age:{
  type:Number
 }
,
image:imageSchema,
task:[TaskSchema],
note:[noteSchema],
date:[dateSchema]

});



userSchema.pre('save',async function(){
 if(this.isModified('password'))this.password=await bcrypt.hash(this.password,8);
});
userSchema.statics.findUser=async(email,password)=>{
 const user=await User.findOne({email});
 if(!user)throw new Error('utilisateur introuvable');
 const isPassword=await bcrypt.compare(password,user.password);
 if (!isPassword)throw new Error('mot de passe incorrecte');
 return user;
}


const User=mongoose.model("Users",userSchema);

module.exports=User;