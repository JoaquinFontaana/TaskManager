import { model, Schema } from "mongoose";

const UserSchema = new Schema({
    password: {
        type:String,  
        required:true},
    email: {
        type:String, 
        required:true,
        lowercase:true},
    signupDate: {
        type: Date,
        default: Date.now()},
    role:{
        type:String,
        default:"user-role"}
}, {
    versionKey:false
})

const User = model('User', UserSchema)

export {User}