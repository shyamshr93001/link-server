import { BODY_EMPTY } from "../constants/auth.constants.js";

const validateBody = (req, res, next) => {
  if (req.method !== "GET" && Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: BODY_EMPTY });
  }
  next();
};

export default validateBody;
