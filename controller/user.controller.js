import Users from "../model/user.model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { transporter, getMailOptions } from "../utils/mailer.utils.js";

dotenv.config();

export const createUser = async (req, res) => {
  console.log("user", req.body);
  try {
    const { email, username, password, firstName, lastName } = req.body;

    if (!(email && username && password && firstName && lastName)) {
      return res.status(400).send("Missing Fields");
    }

    const checkUser = await Users.findOne({
      $or: [{ email: email }, { username: username }],
    }).exec();

    if (checkUser) return res.status(409).send("User Exists Already");

    const user = new Users({
      uuid: uuidv4(),
      email: email,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    console.log(user);
    await user.save();
    res.status(200).send("Registered Successfully");
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send("Error saving data");
  }
};

export const getUser = async (req, res) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    res.send(decoded.user);
  } catch (err) {
    res.status(500).send("Error getting user:", err);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    console.log(emailOrUsername);
    console.log(password);

    if (!emailOrUsername || !password) {
      return res.status(500).send("Missing Fields");
    }

    const user = await Users.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    }).exec();

    if (!user) {
      return res.status(500).send("User not found");
    }

    if (user.password === password) {
      const token = jwt.sign({ user }, process.env.SECRET_KEY);
      return res.json({ message: "Login successful", token, data: user });
    } else {
      res.status(400).send("Password incorrect");
    }
  } catch (err) {
    res.status(500).send("Error getting user:", err);
  }
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email: email });

  if (!user) {
    return res.status(404).send("User not found");
  }

  const token = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 360000;
  await user.save();

  console.log(user);

  const mailOptions = getMailOptions(token, user.email);
  console.log("mailopton", mailOptions)
  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      return res.status(500).send("Error sending email");
    }
    res.status(200).send("Password reset email sent");
  });
};

export const resetPassword = async (req, res) => {
  console.log("working");
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await Users.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .send("Password reset token is invalid or has expired");
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).send("Your password has been reset successfully");
};
