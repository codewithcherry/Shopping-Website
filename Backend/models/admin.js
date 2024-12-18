const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    imageUrl:{
        type:String,
        default:'https://res.cloudinary.com/demlcxzrb/image/upload/v1733217270/default-profile_hvlm0x.jpg'
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        lowercase: true,
    },
    phone:{
        type: Number
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        default:'admin1234'
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin','moderator'],
        default: 'admin',
    },
    location:{
        type:String,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
      }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
