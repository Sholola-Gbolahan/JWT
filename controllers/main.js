const login = async (req, res) => {
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
