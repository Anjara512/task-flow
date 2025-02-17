require('dotenv').config()
const express=require('express');
const User = require( '../models/schema' );
const routeur=new express.Router();
const jwt=require('jsonwebtoken');
const authentification = require( '../middleware/auth' );
const upload = require( '../middleware/upload' );
const sharp=require('sharp')



//creation de l'utilisatueur
routeur.post('/createUser',upload.single("image"),async(req,res)=>{
 const {email,password,name,sexe,age,task,note,date}=req.body;
 if(req.file){
  const compresedImage=await sharp(req.file.buffer).resize(200,200).jpeg({quality:80}).toBuffer()
  const user=new User({email,password,name,sexe,age,image:{
    data:compresedImage,
    contentType:req.file.mimetype
   },task,note,date});
   await user.save();
   res.send('donneés ajouté avec succes');

 }
 const user=new User({email,password,name,sexe,age,image:{
  data:req.file.buffer,
  contentType:req.file.mimetype
 },task,note,date});
 await user.save();
 res.send('donneés ajouté avec succes');
});

//connexion de l'utilisateur
routeur.post('/login',async(req,res)=>{
 const {email,password}=req.body;
 const user=await User.findUser(email,password);
const token =jwt.sign({id:user._id},process.env.SECRETE_KEY);
res.send({user,token})
});


//deconnexion de l'utilisateur
routeur.post('/logout',authentification,async(req,res)=>{
  res.send("deconnexion reussi");
})



//obtenir l'utilisateur connecter
routeur.get('/getUser',authentification,async(req,res)=>{

  try {

   res.send(req.user);

  } catch (error) {
   
  }
});

routeur.patch('/modifyUser/:id',upload.single('image'),async(req,res)=>{

  const userId=req.params.id;
  const {email,password,name,sexe,age,task,note,date}=req.body;

  if(req.file){
    const compresedImage=await sharp(req.file.buffer).resize(200,200).jpeg({quality:80}).toBuffer()
        const user=await User.findByIdAndUpdate(userId,
          {email,password,name,sexe,age,image:{
            data:compresedImage,
            contentType:req.file.mimetype
           },task,note,date});
       await user.save()
       res.send(user)
      //  res.send(user)
 

 }
 

})

// endpointe des taches
routeur.get('/getUser/getTaks',authentification,async (req,res) => {
  const user=req.user;
  res.send(user.task)
  
});
routeur.delete('/getUser/deleteTask/:id',authentification,async(req,res)=>{
  const userId=req.params.id;
  const user=req.user;
  let news=user.task.filter(el=>{
    return el._id!=String(userId);
  });
   user.task=news;
  await user.save()
  res.send(user.task)

});

routeur.post('/getUser/addTasks',authentification,async(req,res)=>{
  const user=req.user;
  
  const {content,DateToCreate,TimeToCreate}=req.body
  try{
    await user.task.push({content,DateToCreate,TimeToCreate,complete:false});
    await user.save()
    res.send('tache ajouté avec succés');
  }
catch(err){
  res.status(404).send('erreur du serveur');

}
});
routeur.get('/getUser/modify/:id',authentification,async(req,res)=>{
  const user=req.user;
  const userId=req.params.id
    let userTask=user.task.filter(el=>{
      return( ":"+el._id )== userId
    });
    res.send(userTask)

 
});
routeur.patch('/getUser/modifier/:id',authentification,async(req,res)=>{
const user=req.user;
const userId=req.params.id;
const {content,DateToCreate,TimeToCreate}=req.body

    let userTask=user.task.filter(el=>{
      return( ":"+el._id )== userId
    });
    userTask[0].content=content;
    userTask[0].DateToCreate=DateToCreate;
    userTask[0].TimeTocreate=TimeToCreate;
    await user.save();
    res.send('ok ca marche bien')


});


// end-pointe des rendez-vous
routeur.post('/getUser/addDates',authentification,async (req,res) => {
  const user=req.user;
  const {person,motif,lieu,heurre,date,createdAt}=req.body;
  
    await user.date.push({person,motif,lieu,heurre,date,createdAt});
    await user.save();
    res.send(user.date)
});
routeur.get('/getUser/getDate',authentification,async (req,res) => {
  const user=req.user;
  try{
    const etc=await user.date;
    const call=await user.note;
    res.send({etc,call})

  }
catch(err){
  console.error(err)
}
routeur.delete('/getUser/deleteTask/:id',authentification,async(req,res)=>{
  const userId=req.params.id;
  const user=req.user;
  let news=user.task.filter(el=>{
    return el._id!=String(userId);
  });
  user.date=news;
  await user.save()
  res.send(user.task)
})
});
routeur.delete('/getUser/deleteDate/:id',authentification,async (req,res)=>{
  try{const userId=req.params.id;
  const user=req.user;
  let news=user.date.filter(el=>{
    return el._id!=String(userId);
  });
   user.date=news;
  await user.save()}
  catch(err){
    res.status(404).send(err)
  }
  
});

routeur.post('/getUser/postNotes',authentification,upload.single('image'),async(req,res)=>{
  const user=req.user;
  const {content,createdAt}=req.body
  

 try{ if(req.file){
    const compresedImage=await sharp(req.file.buffer).resize(200,200).jpeg({quality:80}).toBuffer()

    await user.note.push({content,createdAt,image:{
      data:compresedImage,
      contentType:req.file.mimetype
     }});
    await user.save();
  }else{
    await user.note.push({content,createdAt});
    await user.save()

  }
res.send('donnés ajouter ');}
catch(err){
  res.status(404).send(err)
}
});

routeur.delete('/getUser/deleteNote/:id',authentification,async (req,res)=>{
  const userId=req.params.id;
  const user=req.user;
  let news=user.note.filter(el=>{
    return el._id!=String(userId);
  });
   user.note=news;
  await user.save()
  
});



module.exports=routeur