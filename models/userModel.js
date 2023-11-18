const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
}

const { Int32 } = require('mongodb');
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        userId: {
            type: Number,
            //unique: [true, "userId already exists"],
            required: true
        },
        username: {
            type: String,
            required: [true, "please enter a username"]
        },
        password: {
            type: String,
            required: [true, "please enter a password"]
        },
        role: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);

//module.exports = {ROLE: ROLE, User};
module.exports = User;