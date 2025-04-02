const jwt = require("jsonwebtoken")
const CustomAPIError = require("../errors/custom-error")

const login = async (req, res) => {
  const { username, password } = req.body

  // Validate input
  if (!username || !password) {
    throw new CustomAPIError("Please provide username and password", 400)
  }

  // In a real app, you would:
  // 1. Check if user exists in DB
  // 2. Compare hashed password
  const id = new Date().getDate() // Demo only - replace with actual user ID

  try {
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    })

    res.status(200).json({
      success: true,
      token,
      user: { id, username }, // Include basic user info
    })
  } catch (error) {
    throw new CustomAPIError("Token generation failed", 500)
  }
}

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401)
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach user to response
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({
      success: true,
      msg: `Hello, ${decoded.username}`,
      secret: `Your lucky number is ${luckyNumber}`,
      user: decoded, // Return decoded user info
    })
  } catch (error) {
    throw new CustomAPIError(
      error.name === "JsonWebTokenError"
        ? "Invalid token"
        : "Not authorized to access this route",
      401
    )
  }
}

module.exports = {
  login,
  dashboard,
}
