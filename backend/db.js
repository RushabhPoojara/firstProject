const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rushabhpoojara0303:rushbhai9@db1.z2tm0og.mongodb.net/')

const dbschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance : {
        type : Number,
        required : true
    }
})


const User = mongoose.model('User', dbschema)
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,Account
}