const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    profilePicture: {
        type: String,
    }
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
