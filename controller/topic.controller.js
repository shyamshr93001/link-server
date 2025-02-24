import {
  TOPIC_ALREADY_EXISTS,
  TOPIC_CREATED_FAIL,
  TOPIC_DELETE_FAIL,
  TOPIC_DELETE_SUCCESS,
  TOPIC_GET_FAIL,
  TOPIC_NOT_FOUND,
  TOPIC_UPDATE_FAIL,
  TOPIC_UPDATE_SUCCESS,
} from "../constants/topic.constants.js";
import { MISSING_FIELD } from "../constants/user.constants.js";
import Subscriptions from "../model/subscription.model.js";
import Topics from "../model/topic.model.js";

import { v4 as uuidV4 } from "uuid";

export const createTopic = async (req, res) => {
  try {
    const { name, createdBy, visibility } = req.body;
    if (!(name && createdBy && visibility)) {
      return res.status(400).send(MISSING_FIELD);
    }

    const checkTopic = await Topics.findOne({ name }).exec();

    if (checkTopic) {
      return res.status(409).send(TOPIC_ALREADY_EXISTS);
    }
    const topic = new Topics({
      uuid: uuidV4(),
      name: name,
      createdBy: createdBy,
      visibility: visibility,
    });
    console.log(topic);
    await topic.save();
    res.send(topic);
  } catch (err) {
    console.error("Error saving topic:", err);
    res.status(500).send(TOPIC_CREATED_FAIL);
  }
};

export const getTopics = async (req, res) => {
  try {
    const topic = await Topics.find();
    res.send(topic);
  } catch (err) {
    res.status(500).send(TOPIC_GET_FAIL, err);
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send(MISSING_FIELD);
    }

    const topic = await Topics.findOneAndDelete({ name }).exec();

    const subscriptions = await Subscriptions.find({ topic: name }).exec();

    if (subscriptions.length !== 0)
      await Subscriptions.deleteMany({ topic: name }).exec();

    if (topic == null) res.status(500).send(TOPIC_NOT_FOUND);
    else res.send(TOPIC_DELETE_SUCCESS);
  } catch (err) {
    console.error("Error deleting topic:", err);
    res.status(500).send(TOPIC_DELETE_FAIL);
  }
};

export const updateTopic = async (req, res) => {
  try {
    const { name, visibility, newName } = req.body;

    if (!name || !visibility || !newName) {
      return res.status(400).send(MISSING_FIELD);
    }

    const checkTopic = await Topics.findOne({
      name: newName,
      visibility: visibility,
    }).exec();

    if (checkTopic) {
      res.status(409).send(TOPIC_ALREADY_EXISTS);
      return;
    }

    const topic = await Topics.findOneAndUpdate(
      { name },
      { name: newName, visibility }
    ).exec();
    if (topic == null) return res.status(404).send(TOPIC_NOT_FOUND);
    else res.send(TOPIC_UPDATE_SUCCESS);
  } catch (err) {
    console.error("Error updating topic:", err);
    res.status(500).send(TOPIC_UPDATE_FAIL);
  }
};
