import Subscriptions from "../model/subscription.js";
import { v4 as uuidv4 } from "uuid";

export const subscribeTopic = async (req, res) => {
  try {
    const { topic, user, seriousness } = req.body;
    if (!(topic && user && seriousness)) {
      return res.status(400).send("Missing Fields");
    }

    const checkSubscribe = await Subscriptions.findOne({ topic, user }).exec();

    if (checkSubscribe) {
      res.status(409).send("Subscribed Exists Already");
      return;
    }
    const sub = new Subscriptions({
      uuid: uuidv4(),
      topic: topic,
      user: user,
      seriousness: seriousness,
    });
    console.log(sub);
    await sub.save();

    res.send("Subscribed to topic");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error while subscribing");
  }
};

export const unsubscribeTopic = async (req, res) => {
  try {
    const { topic, user } = req.body;
    if (!(topic && user)) {
      return res.status(400).send("Missing Fields");
    }

    const result = await Subscriptions.findOneAndDelete({ topic, user }).exec();

    if (!result) {
      res.status(404).send("Subscription not found");
      return;
    }

    res.send("Unsubscribed from topic");
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error while unsubscribing");
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subs = await Subscriptions.find();
    res.send(subs);
  } catch (err) {
    res.status(500).send("Error getting subscribers:", err);
  }
};
