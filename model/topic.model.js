import mongoose from "mongoose";
const { Schema } = mongoose;

const TopicSchema = new Schema({
  uuid: { type: String },
  name: { type: String, required: true },
  createdBy: { type: String, required: true, ref: "Users" },
  dateCreated: { type: Date, default: Date.now, required: true },
  lastUpdated: { type: Date, default: Date.now, required: true },
  visibility: { type: String, enum: ["public", "private"], required: true },
});

const Topics = mongoose.model("Topics", TopicSchema);
export default Topics;
