import Users from "../model/user.model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { v4 as uuidV4 } from "uuid";
import { transporter, getMailOptions } from "../utils/mailer.utils.js";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  MISSING_FIELD,
  PASSWORD_INCORRECT,
  PASSWORD_RESET_INVALID_TOKEN,
  PASSWORD_RESET_SENT,
  PASSWORD_RESET_SENT_FAIL,
  PASSWORD_RESET_SUCCESS,
  REGISTERED_FAIL,
  REGISTERED_SUCCESS,
  USER_ALREADY_EXISTS,
  USER_GET_FAIL,
  USER_NOT_FOUND,
} from "../constants/user.constants.js";

dotenv.config();

export const createUser = async (req, res) => {
  console.log("user", req.body);
  try {
    const { email, username, password, firstName, lastName } = req.body;

    if (!(email && username && password && firstName && lastName)) {
      return res.status(400).send(MISSING_FIELD);
    }

    const checkUser = await Users.findOne({
      $or: [{ email: email }, { username: username }],
    }).exec();

    if (checkUser) return res.status(409).send(USER_ALREADY_EXISTS);

    const user = new Users({
      uuid: uuidV4(),
      email: email,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    console.log(user);
    await user.save();
    res.status(200).send(REGISTERED_SUCCESS);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send(REGISTERED_FAIL);
  }
};

export const getUser = async (req, res) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    res.send(decoded.user);
  } catch (err) {
    res.status(500).send(USER_GET_FAIL, err);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    console.log(emailOrUsername);
    console.log(password);

    if (!emailOrUsername || !password) {
      return res.status(500).send(MISSING_FIELD);
    }

    const user = await Users.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    }).exec();

    if (!user) {
      return res.status(500).send(USER_NOT_FOUND);
    }

    if (user.password === password) {
      const token = jwt.sign({ user }, process.env.SECRET_KEY);
      return res.json({ message: LOGIN_SUCCESS, token, data: user });
    } else {
      res.status(400).send(PASSWORD_INCORRECT);
    }
  } catch (err) {
    res.status(500).send(LOGIN_FAIL, err);
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email: email });

  if (!user) {
    return res.status(404).send(USER_NOT_FOUND);
  }

  const token = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 360000;
  await user.save();

  console.log(user);

  const mailOptions = getMailOptions(token, user.email);

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      return res.status(500).send(PASSWORD_RESET_SENT_FAIL);
    }
    res.status(200).send(PASSWORD_RESET_SENT);
  });
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await Users.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).send(PASSWORD_RESET_INVALID_TOKEN);
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  
  res.status(200).send(PASSWORD_RESET_SUCCESS);
};
