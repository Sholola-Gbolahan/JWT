// 1. import necessary
const jwt = require("jsonwebtoken")
const { UnauthenticatedError } = require("../errors")

// 1. Setting up the middleware
const authorizationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith("Bearer ")) {
    throw new UnauthenticatedError("No token provided")
  }

  const token = authHeader.split(" ")[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const { id, username } = decoded
    // Passing down the decoded value to req.user
    req.user = { id, username }
    next()
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route")
  }
}

module.exports = authorizationMiddleware
