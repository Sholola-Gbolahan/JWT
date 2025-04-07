const jwt = require("jsonwebtoken")
const { BadRequestError } = require("../errors")

const login = async (req, res) => {
  const { username, password } = req.body

  // Validate input
  if (!username || !password) {
    throw new BadRequestError("Please provide username and password")
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
    throw new BadRequestError("Token generation failed")
  }
}

const dashboard = async (req, res) => {
  console.log(req.user)

  const luckyNumber = Math.floor(Math.random() * 100)

  res.status(200).json({
    success: true,
    msg: `Hello, ${req.user.username}`,
    secret: `Your lucky number is ${luckyNumber}`,
    user: req.user, // Return decoded user info
  })
}

module.exports = {
  login,
  dashboard,
}
