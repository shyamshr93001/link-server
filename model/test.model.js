import mongoose from "mongoose";
const { Schema } = mongoose;

const TestSchema = new Schema({
  uuid: { type: String },
  topic: { type: String, ref:'Topics' },
  user: { type: String, ref: 'Users' }
});

const Test = mongoose.model("Tests", TestSchema);
export default Test;
