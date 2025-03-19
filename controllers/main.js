// Check username, password in post(login) request
// If exit create new JWT
// Send back to frontend

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

  res.send("Fake Login/Register/Signup")
}
const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100) // generating some random numbers
  res.status(200).json({
    msg: "Hello, John Doe",
    secret: `Here's your authorizated data, your lucky number is ${luckyNumber}`,
  })
}

module.exports = {
  login,
  dashboard,
}
