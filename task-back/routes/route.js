require('dotenv').config()
const express=require('express');
const User = require( '../models/schema' );
const routeur=new express.Router();
const jwt=require('jsonwebtoken');
const authentification = require( '../middleware/auth' );
const upload = require( '../middleware/upload' );
const sharp=require('sharp');
const nodemailer=require('nodemailer')





const transporter=nodemailer.createTransport({
  secureConnection:false,
  port:587,
  tls:{
   ciphers:"SSLv3"
  },
  // service:"Gmail",

  auth:{
   user:process.env.EMAIL,
   pass:process.env.EMAIL_PASSWORD

  }
 });



routeur.post('/send-code',async(req,res)=>{
  const {email}=req.body;

  const confirmationCode=Math.floor(1000+Math.random()*9000);
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Test Email Nodemailer',
    html: '<h1>Ceci est un email en HTML envoyé avec Nodemailer!</h1>'+confirmationCode  // Contenu HTML
  };
  

     transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Erreur:', error);
      } else {
        console.log('Email envoyé:', info.response);
      }
    });
    
    const codeStocké=confirmationCode;
    res.send('email confirmer avec succe')

})
routeur.post('/verifyCode',async(req,res)=>{
  const {code}=req.body;
  if(code==codeStocké.valeur){
    res.send('code validé');
  }
  else{
    res.status(400).send("code eronner")
  }
})


//creation de l'utilisatueur
routeur.post('/createUser',upload.single("image"),async(req,res)=>{
  try{
 const {email,password,name,sexe,age,task,note,date}=req.body;
 if(req.file){
  const compresedImage=await sharp(req.file.buffer).resize(200,200).jpeg({quality:80}).toBuffer()
  const user=new User({email,password,name,sexe,age,image:{
    data:compresedImage,
    contentType:req.file.mimetype
   },task,note,date});
   await user.save();
   

 }
 const user=new User({email,password,name,sexe,age,image:{
  data:req.file.buffer,
  contentType:req.file.mimetype
 },task,note,date});
 await user.save();
 res.send('donneés ajouté avec succes');
}catch(error){
  res.status(400).send("impossible d'ajouter l'utilisateur")
}
});


//connexion de l'utilisateur
routeur.post('/login',async(req,res)=>{
 const {email,password}=req.body;
 const user=await User.findUser(email,password);
const token =jwt.sign({id:user._id},process.env.SECRETE_KEY);
res.send({user,token});

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
    res.send("erroner",error)
   
  }
});

//modifier les information personnelle de l'utilisateur

routeur.put('/modifyUser/:id',upload.single('image'),async(req,res)=>{

  const userId=req.params.id;
  const {email,password,name,sexe,age,task,note,date}=req.body;

  if(req.file){
    const compresedImage=await sharp(req.file.buffer).resize(200,200).jpeg({quality:80}).toBuffer()
        const user=await User.findById(userId)
          user.email=email?email:user.email;
          user.password=password?password:user.password;
          user.name=name?name:user.name;
          user.age=age?age:user.age;
          user.sexe=sexe?sexe:user.sexe;
          user.note=note?note:user.note;
          user.task=task?task:user.task;
          user.date=date?date:user.date;
          user.image=req.file?{
            data:compresedImage,
            contentType:req.file.mimetype
           }:user.image;

       await user.save()
       
 }
 const user=await User.findById(userId);
          user.email=email?email:user.email;
          user.password=password?password:user.password;
          user.name=name?name:user.name;
          user.age=age?age:user.age;
          user.sexe=sexe?sexe:user.sexe;
          user.note=note?note:user.note;
          user.task=task?task:user.task;
          user.date=date?date:user.date;

       await user.save()
       res.send(user);

})

// endpointe des taches
routeur.get('/getUser/getTaks',authentification,async (req,res) => {
  //recuperer les taches de l'utilisateur connecter

try{  
  const user=req.user;
  let incomplete=user.task.filter(el=>{
    return el.complete==false
  })
  let complete=user.task.filter(el=>{
    return el.complete==true
  })
  res.send({incomplete,complete});
}
catch(err){
  res.status(400).send("impossible de recuperer les taches")
}
  
});
routeur.delete('/getUser/deleteTask/:id',authentification,async(req,res)=>{
  // supprimer les taches a partir de on id

try{  let userId=req.params.id;
  userId=userId.split(",")
  const user=req.user;

  for(let id of userId){

    let news=user.task.filter(el=>{
      return el._id!=String(id);
    });
    user.task=news;
  }
  await user.save()
  res.send(user.task)}
  catch(err){
    res.status(400).send("non effectué");
  }

});


//ajouter une nouvelle taches
routeur.post('/getUser/addTasks',authentification,async(req,res)=>{
  const user=req.user;
  
  const {content,DateToCreate,TimeToCreate,complete}=req.body
  try{
    await user.task.push({content,DateToCreate,TimeToCreate,complete});
    await user.save()
    res.send('tache ajouté avec succés');
  }
catch(err){
  res.status(404).send('erreur du serveur');

}
});


//compltéter une tache
routeur.get("/getUser/completedTask/:id",authentification,async(req,res)=>{
  let userId=req.params.id;
  userId=userId.split(',');
  const user=req.user;

try{  for(let id of userId){
    let news=user.task.map(el=>{
      if(el._id==id)
     return {
    ...el,
    complete:true
  }
  return el
      
    });
    user.task=news;
    
  }
    await user.save();}
    catch(err){
      res.status(400).send('operation non efectué');
    }

})

//recuper la tache de  l'utilisateur a modifier
routeur.get('/getUser/modify/:id',authentification,async(req,res)=>{
  const user=req.user;
  const userId=req.params.id
    let userTask=user.task.filter(el=>{
      return( ":"+el._id )== userId
    });
    res.send(userTask)
 
});

//modifier la tache  l'utilisateur
routeur.patch('/getUser/modifier/:id',authentification,async(req,res)=>{
const user=req.user;
const userId=req.params.id;
const {content,DateToCreate,TimeToCreate}=req.body

   try{ let userTask=user.task.filter(el=>{
      return( ":"+el._id )== userId
    });
    userTask[0].content=content;
    userTask[0].DateToCreate=DateToCreate;
    userTask[0].TimeTocreate=TimeToCreate;
    await user.save();
    res.send('utilisateur midifié avec succés')}
    catch{
      res.status(400).send("")
    }

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

//Note
//ajouter une nouvelle note

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


//supprimer le note de l'utilisateur
routeur.delete('/getUser/deleteNote/:id',authentification,async (req,res)=>{
  let userId=req.params.id;
  userId=userId.split(",")
  const user=req.user;

try{  for(let id of userId){

    let news=user.note.filter(el=>{
      return el._id!=String(id);
    });
    user.note=news;
  }
  await user.save()
  res.send(user.note)}
  catch{
    res.status(400).send("supression  echouée")
  }
  
});



module.exports=routeur