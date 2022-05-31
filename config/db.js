const mongoose =require('mongoose')
const connectation=()=>{
    mongoose.connect(process.env.MON_URL,(err)=>{
        if(err) throw err
        console.log('data is successfully connected')
    })
}

module.exports=connectation

