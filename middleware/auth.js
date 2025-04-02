// 1. import necessary
const jwt = require("jsonwebtoken")
const CustomAPIError = require("../errors/custom-error")

// 1. Setting up the middleware
const authorizationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401)
  }

  const token = authHeader.split(" ")[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    // Passing down the decoded value to req.user
    req.user = { id, username }
    next()
  } catch (error) {
    throw new CustomAPIError(
      error.name === "JsonWebTokenError"
        ? "Invalid token"
        : "Not authorized to access this route",
      401
    )
  }
}

module.exports = authorizationMiddleware
