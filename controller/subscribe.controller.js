import Subscriptions from "../model/subscription.model.js";
import { v4 as uuidV4 } from "uuid";
import Test from "../model/test.model.js";
import { MISSING_FIELD } from "../constants/user.constants.js";
import {
  SUBSCRIBE_EXISTS,
  SUBSCRIBE_FAIL,
  SUBSCRIBE_SUCCESS,
  SUBSCRIPTION_GET_FAIL,
  SUBSCRIPTION_NOT_FOUND,
  UNSUBSCRIBE_FAIL,
  UNSUBSCRIBE_SUCCESS,
} from "../constants/subs.constants.js";

export const subscribeTopic = async (req, res) => {
  try {
    const { topic, user, seriousness } = req.body;
    if (!(topic && user && seriousness)) {
      return res.status(400).send(MISSING_FIELD);
    }

    const checkSubscribe = await Subscriptions.findOne({ topic, user }).exec();

    if (checkSubscribe) {
      res.status(409).send(SUBSCRIBE_EXISTS);
      return;
    }
    const sub = new Subscriptions({
      uuid: uuidV4(),
      topic: topic,
      user: user,
      seriousness: seriousness,
    });
    console.log(sub);
    await sub.save();

    res.send(SUBSCRIBE_SUCCESS);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send(SUBSCRIBE_FAIL);
  }
};

export const unsubscribeTopic = async (req, res) => {
  try {
    const { topic, user } = req.body;
    if (!(topic && user)) {
      return res.status(400).send(MISSING_FIELD);
    }

    const result = await Subscriptions.findOneAndDelete({ topic, user }).exec();

    if (!result) {
      res.status(404).send(SUBSCRIPTION_NOT_FOUND);
      return;
    }

    res.send(UNSUBSCRIBE_SUCCESS);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send(UNSUBSCRIBE_FAIL);
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subs = await Subscriptions.find()
      .populate({
        path: "topic",
        foreignField: "name",
      })
      .populate({
        path: "user",
        foreignField: "username",
      })
      .exec();
    res.send(subs);
  } catch (err) {
    res.status(500).send(SUBSCRIPTION_GET_FAIL, err);
  }
};

// export const testFunc = async (req, res) => {
//   try {
//     const topic = new Test({
//       topic: req.body.topic,
//       user: req.body.user,
//     });

//     await topic.save();
//     res.send(topic);
//   } catch (error) {
//     res.send(error);
//   }
// };

// export const testReadFunc = async (req, res) => {
//   try {
//     const topics = await Test.find()
//       .populate({
//         path: "topic",
//         foreignField: "uuid",
//       })
//       .populate({
//         path: "user",
//         foreignField: "uuid",
//       })
//       .exec();
//     res.send(topics);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error reading topics:", err);
//   }
// };
