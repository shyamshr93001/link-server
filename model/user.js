const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    admin: { type: Boolean, default: false, required: true },
    active: { type: Boolean, default: true, required: true },
    dateCreated: { type: Date, default: Date.now, required: true },
    lastUpdated: { type: Date, default: Date.now, required: true },
    
});

const Users = mongoose.model("Users", UserSchema);
module.exports = Users