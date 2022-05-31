const router=require('express').Router()
const multer=require('multer')
const File=require('../models/fileModal')
const path=require('path')
const {v4:uuid4}=require('uuid')
const sendmail=require('../service/emailService')
const emailTemplete=require('../service/emailTemplete')
let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        const unique=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`
        cb(null,unique)
    }
    
})
let upload=multer({
    storage:storage,
    limits:{fileSize:1000000*100}
}).single('myfile')


router.post('/',  (req,res)=>{
    ////// validate Request 

    ///// store files
    upload(req,res,async (err)=>{
        if(!req.file){
            return res.status(440).json({error:"All fields are required"})
        }
        if(err){
         return   res.json({error:err.message})
        }
        const file= new File({
            filename:req.file.filename,
            uuid:uuid4(),
            path:req.file.path,
            size:req.file.size
        })
        const respone=await file.save()
        return res.json({file:`${process.env.APP_BASE_URL}/files/${respone.uuid}`,uuid: respone.uuid})
    })



    ///// 



})
router.post('/send',async(req,res)=>{

try {
    
  const {uuid,emailTo,emailFrom}=req.body
  if(!uuid||!emailTo||!emailFrom){
      return res.status(440).json({error:'all feilds are require'})
  }  
  const file=await File.findOne({uuid})
  if(file.sender){
      return res.status(440).json({error:'Email is already sent'})
  }
  file.sender=emailFrom
  file.receiver=emailTo
  const respone =await file.save()

  sendmail({from:emailFrom,
    to:emailTo,
    subject:'easyTransfer',
    text:`${emailFrom} share file with you`,
    html:emailTemplete({emailFrom:emailFrom,downloadLink:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`,size:`${parseInt(file.size/1000)}-KB`,expires:"24 Hours"})
})
res.status(200).json({success:true,message:"email sended "})
} catch (error) {
    console.log(error)
}




})


module.exports=router