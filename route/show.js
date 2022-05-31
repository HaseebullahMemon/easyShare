const router =require('express').Router()
const File=require('../models/fileModal')

router.get('/:uuid',async (req,res)=>{
    try {
        const uuid=req.params.uuid
        const file=await File.findOne({uuid})      
        if(!file){
            return res.status(440).json({error:"Link has been expired"})
        }
        res.json({uuid:file.uuid,
        fileName:file.filename,
        fileSize:file.size,
        downloadLink:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        
        })
    } catch (error) {
        res.status(440).json({error:'something went wronge'})
    }
  

})

module.exports=router