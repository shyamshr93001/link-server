import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./router/user.routes.js";
import topicRoute from "./router/topic.routes.js";
import subsRoute from "./router/subscribe.routes.js" 
import "./db.js";

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", userRoute);
app.use("/", topicRoute);
app.use("/", subsRoute)
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
