const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String,
    },
    age: {
        type: Number
    },
    resume:{
        type:String
    },
    contact:{
        type:String
    },
    address:{
        type:String
    }
});

const AuthModel = mongoose.model('authModel', authSchema);

module.exports = AuthModel;
