const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


// userschema methods 
UserSchema.methods.comparePasswords= function(password){
    return bcrypt.compare(password,this.password)
}

module.exports = mongoose.model('User', UserSchema)