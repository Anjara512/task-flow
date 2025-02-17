const mutler=require('multer')
const storage=mutler.memoryStorage();
const upload=mutler({storage});


module.exports=upload