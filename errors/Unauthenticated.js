const CustomAPIError = require("./custom-error")

class Unauthenticated extends CustomAPIError {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = 401
  }
}

module.exports = Unauthenticated
