// Check username, password in post(login) request
// If exit create new JWT
// Send back to frontend
const jwt = require("jsonwebtoken")

const CustomAPIError = require("../errors/custom-error")

// Setup Authentication so only the request with JWt can access the dashboard

const login = async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  //Methods to Validate username and password
  // - Mongoose Validation , -Joi, -Check in the controller
  if (!username || !password) {
    throw new CustomAPIError("please provide email and password", 400)
  }

  // This is a demo, usually provided by DB!!!!
  const id = new Date().getDate()

  // using the sign func where we pass the payload and secrets
  // Note: Try to keep payload small, better experience for user
  // Note : Just for Demo,in production, use long, complex, unguessable string value!!!!!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
  res.status(200).json({ msg: "user created", token })
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100) // generating some random numbers
  res.status(200).json({
    msg: "Hello, John Doe",
    secret: `Here's your authorized data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}
