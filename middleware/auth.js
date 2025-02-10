import jwt from "jsonwebtoken";

function checkAuth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Authorization header is missing");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    res.status(500).send("Invalid token", err);
  }
  next();
}

export default checkAuth;
