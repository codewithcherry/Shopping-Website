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
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin','moderator'],
        default: 'admin',
    },
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
