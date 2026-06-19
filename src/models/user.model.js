import mongoose from "mongoose"

const userSchema=new mongoose.Schema(
    ({
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:[true,"Password is requred"]
        },
        collections:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Collection"
        }],
        bookmarks:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Bookmark"
        }]
    }



    ),{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
        this.password= await bcrypt.hash(this.password,10)
    next();
});

userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password)
};

userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,

    },process.env.ACCESS_TOKEN_SECREAT,
{    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
}
    )}

export const User=mongoose.model("User",userSchema)