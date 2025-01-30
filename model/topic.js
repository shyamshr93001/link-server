const mongoose = require('mongoose');

const TopicSchema = new Schema({
    name: { type: String, required: true },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    dateCreated: { type: Date, default: Date.now, required: true },
    lastUpdated: { type: Date, default: Date.now, required: true },
    visibility: { type: String, enum: ['public', 'private'], required: true },
});

const Topics = mongoose.model("Topics", TopicSchema);
module.exports = Topics