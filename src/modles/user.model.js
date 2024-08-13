import mongoose,{Schema, Types} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
    username:{
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        trim: true,
    },
    fullname:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avater:{
        type: String,
        required: true,
    },
    coverImage:{
        type: String,
    },
    watchHistory:[{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    password:{
        type: String,
        required: [true,'password is required']
    },
    refreshToken:{
        type: String
    }

},
{
    timestamps: true
}
)

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function
(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.method.generateAccessToken = function(){
  return jwt.sign(
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ASSESS_TOKEN_EXPIRY
    }
)
}

userSchema.method.generateRefreshToken = function()
{
    return jwt.sign(
        {
        _id: this._id,
        
    },
    process.env.REFRSH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const user = mongoose.model("User",userSchema)