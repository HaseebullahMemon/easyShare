const express =require('express')
const app=express()
require('dotenv').config({path:'./.env'})
const connectation=require('./config/db')
connectation()
app.use(express.json())

////////////////////// Routers //////////////////////////
app.use('/api/files',require('./route/files'))
app.use('/files',require('./route/show'))
app.use('/files/download',require('./route/download'))


if(process.env.NODE_ENV==='production'){
    app.use(express.static('frontend/build'))
}



app.listen(process.env.PORT||8000,()=>{
    console.log(`server is running on the Port ${process.env.PORT}`)
})