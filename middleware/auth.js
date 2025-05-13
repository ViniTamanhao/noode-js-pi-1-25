const jwt = require("jsonwebtoken");

const authenticate = (request, response, next) => {
  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    return response.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded; // Attach user data to the request object
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    response.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authenticate;
