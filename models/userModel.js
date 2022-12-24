const mongoose=require('mongoose')
const bcrypt =require('bcrypt')
const validator=require('validator'); 
const Schema= mongoose.Schema;

const userSchema= new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}, { timestamps: true })


// static signup method 
userSchema.statics.signup = async function(email,firstname,lastname,dateOfBirth,password){
    
    // validation
    if(!email || !password){
        throw Error('Please fill all fields');
    }
    if(!validator.isEmail(email)){
        throw Error("This email is not vaild")
    }
    if(!validator.isStrongPassword(password)){
        throw Error('This password is not strong enough')
    }

    const exists=await this.findOne({email})
    if (exists){
        throw Error('Email alrady in use!')
    } 
    const salt = await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt)

    const user= await this.create({email,firstname,lastname,dateOfBirth,password:hash})
    return user;
}

// statics login function
userSchema.statics.login=async function(email,password){
    if (!email || !password){
        throw Error('Enter email and Password');
    }

    const user=await this.findOne({email})
    if (!user){
        throw Error('In correct email')
    }

    const match=await bcrypt.compare(password, user.password)
    if (!match){
        throw Error('Invailed password  ')
    }
    return user
}

module.exports=mongoose.model('User',userSchema)