const dotenv =require("dotenv")
const express = require('express')
const mongoose = require('mongoose')
const userRoutes=require('./routes/user')

dotenv.config();
 port=process.env.PORT ;
// express app
const app=express();

// middleware
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

// routes
app.use('api/user',userRoutes)

// connection DB
mongoose.set('strictQuery',true)
mongoose.connect('mongodb+srv://akhror:q1w2e3r4@reviews.hz750kl.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
// listen request
app.listen(port,()=>{
    console.log('connected DB and listening port ',port)
})
})
.catch((error)=>{
    console.log(error)
})

