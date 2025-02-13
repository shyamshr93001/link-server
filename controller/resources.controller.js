import {
  RESOURCE_ADD_FAIL,
  RESOURCE_DELETE_FAIL,
  RESOURCE_GET_FAIL,
  RESOURCE_UPDATE_FAIL,
} from "../constants/resources.constants.js";
import { MISSING_FIELD } from "../constants/user.constants.js";
import Resource from "../model/resource.model.js";

export const addResource = async (req, res) => {
  try {
    const { createdBy, description, topic } = req.body;

    if (!(createdBy && description && topic)) {
      return res.status(400).send(MISSING_FIELD);
    }

    await newResource.save();
    res.status(201).send(newResource);
  } catch (err) {
    console.error("Error adding resource:", err);
    res.status(500).send(RESOURCE_ADD_FAIL);
  }
};

export const getResource = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).send(resources);
  } catch (err) {
    console.error("Error getting resources:", err);
    res.status(500).send(RESOURCE_GET_FAIL);
  }
};

export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { createdBy, description, topic } = req.body;

    if (!(createdBy && description && topic)) {
      return res.status(400).send(MISSING_FIELD);
    }
    // const updatedResource = await Resource.findByIdAndUpdate(
    //   id,
    //   { name, description, url },
    //   { new: true }
    // );

    // if (!updatedResource) {
    //   return res.status(404).send("Resource not found");
    // }

    // res.status(200).send(updatedResource);
  } catch (err) {
    console.error("Error updating resource:", err);
    res.status(500).send(RESOURCE_UPDATE_FAIL);
  }
};

export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedResource = await Resource.findByIdAndDelete(id);

    if (!deletedResource) {
      return res.status(404).send("Resource not found");
    }

    res.status(200).send("Resource deleted successfully");
  } catch (err) {
    console.error("Error deleting resource:", err);
    res.status(500).send(RESOURCE_DELETE_FAIL);
  }
};
