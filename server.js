const dotenv =require("dotenv")
const express = require('express')
const mongoose = require('mongoose')
const userRoutes=require('./routes/user')

dotenv.config();
// express app
const app=express();

// middleware
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

// routes
app.use('/api/users',userRoutes)

// connection DB
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
// listen request
app.listen(process.env.PORT,()=>{
    console.log('connected DB and listening port ',process.env.PORT)
})
})
.catch((error)=>{
    console.log(error)
})

