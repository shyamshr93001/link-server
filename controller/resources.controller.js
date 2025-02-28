import {
  RESOURCE_ADD_FAIL,
  RESOURCE_DELETE_FAIL,
  RESOURCE_GET_FAIL,
  RESOURCE_UPDATE_FAIL,
} from "../constants/resources.constants.js";
import { MISSING_FIELD } from "../constants/user.constants.js";
import Resource from "../model/resources.model.js";
import { v4 as uuidV4 } from "uuid";

export const addResource = async (req, res) => {
  try {
    const { createdBy, description, topic, url } = req.body;

    if (!(createdBy && topic)) {
      return res.status(400).send(MISSING_FIELD);
    }
    const newResource = new Resource({
      uuid: uuidV4(),
      createdBy: createdBy,
      description: description,
      topic: topic,
      url: url,
    });
    await newResource.save();
    res.status(201).send(newResource);
  } catch (err) {
    console.error("Error adding resource:", err);
    res.status(500).send(RESOURCE_ADD_FAIL);
  }
};

export const getResource = async (req, res) => {
  try {
    const resources = await Resource.find()
      .populate({
        path: "topic",
        foreignField: "name",
      })
      .exec();
    res.status(200).send(resources);
  } catch (err) {
    console.error("Error getting resources:", err);
    res.status(500).send(RESOURCE_GET_FAIL);
  }
};
