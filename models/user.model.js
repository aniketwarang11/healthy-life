const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    lname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    emailid: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 5
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
},
    {
        timestamps: true,
    });

const User = mongoose.model('User', userSchema);

module.exports = User;

