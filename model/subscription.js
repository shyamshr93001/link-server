const mongoose = require('mongoose');
const {Schema} = mongoose;

const SubsSchema = new Schema({
    topic: {type: mongoose.Schema.Types.ObjectId, ref: 'Topics', required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    seriousness: { type: String, enum: ['Serious', 'Very Serious', 'Casual'], required: true },
    dateCreated: { type: Date, default: Date.now, required: true },
    
});

const Subscriptions = mongoose.model("Subscriptions", SubsSchema);
module.exports = Subscriptions