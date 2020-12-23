const jwt = require("jsonwebtoken");
const jwtPrivateKey = "really-secure-256-bit-secret-key"; // should be stored in env variable

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decodedPayload = jwt.verify(token, jwtPrivateKey);
    req.user = decodedPayload;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};

module.exports = auth;
