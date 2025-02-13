import mongoose from "mongoose";
const { Schema } = mongoose;

const ResourceSchema = new Schema({
  uuid: { type: String },
  topic: { type: String, required: true, ref: 'Topics' },
  createdBy: { type: String, required: true, ref: 'Users' },
  dateCreated: { type: Date, default: Date.now, required: true },
  lastUpdated: { type: Date, default: Date.now, required: true },
});

const Resource = mongoose.model("Resources", ResourceSchema);
export default Resource;
