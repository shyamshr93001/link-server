import jwt from "jsonwebtoken";
import {
  AUTH_HEADER_MISSING,
  INVALID_TOKEN,
} from "../constants/auth.constants.js";

function checkAuth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send(AUTH_HEADER_MISSING);
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    res.status(500).send(INVALID_TOKEN, err);
  }
  next();
}

export default checkAuth;
