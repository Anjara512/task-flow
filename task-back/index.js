const express=require('express');
const main = require( './database/mongoose' );
const useRouter=require('././routes/route');
const cors=require('cors');
const serve=express();
const PORT=5050;


serve.use(express.json());
serve.use(cors())
serve.use(useRouter);

main().then(()=>console.log('connexion a la base de donnée reussi')).catch(()=>{console.log("connexion expiré")});

serve.listen(PORT,()=>{
 console.log(`application lancée su le port http://localhost:${PORT}`)
})