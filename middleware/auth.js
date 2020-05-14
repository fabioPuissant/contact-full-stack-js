const jwt = require("jsonwebtoken");
const config = require("../config/default.json");

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied!" });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const keyValue = (input) =>
      Object.entries(input).forEach(([key, value]) => {
        console.log(`User token decoded: ${key}`, value);
      });
    keyValue(decoded);

    req.user = decoded.user;
    next();
  } catch (err) {
    res
      .status(401)
      .json({ message: "No a valid token was sent with this request!" });
  }
};
