const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
require('./db'); //import and execute a module named 'db' in a Node.js application
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    regno:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    company:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true       
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
})
userSchema.pre("save",function(next){
    // This registers a middleware function to be executed before saving a document of userSchema type.
    // next is a function that moves the execution flow to the next middleware in line 
    const user=this;

    if(this.isModified("password"))
    {
       bcrypt.hash(user.password,8,(err,hash)=>{/*The 8 is the number of rounds of hashing. Increasing the number of rounds 
       increases the computational complexity,making it harder for attackers to perform brute-force attacks.*/
        if(err) {return next(err);}

        user.password=hash;
        next();
       })
    }
    else
    return next();
});
userSchema.methods.comparepassword= async function(password)
{
    try{
        const result=await bcrypt.compare(password,this.password)
        return result
    }catch(error)
    {
        console.log("error in password method",error.message);
    }
    console.log(result);
}
var user = mongoose.model('employeeauth',userSchema); //collection and schema

module.exports= user