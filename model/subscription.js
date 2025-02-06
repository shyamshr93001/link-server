import mongoose from "mongoose";
const { Schema } = mongoose;

const SubsSchema = new Schema({
    uuid: { type: String },
  topic: { type: String, required: true },
  user: { type: String, required: true },
  seriousness: {
    type: String,
    enum: ["Serious", "Very Serious", "Casual"],
    required: true,
  },
  dateCreated: { type: Date, default: Date.now, required: true },
});

const Subscriptions = mongoose.model("Subscriptions", SubsSchema);
export default Subscriptions;
