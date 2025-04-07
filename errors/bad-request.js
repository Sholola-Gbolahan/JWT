const CustomAPIError = require("./custom-error")
const { StatusCode } = require("http-status-codes") // Using the installed "http-status-code" library
class BadRequest extends CustomAPIError {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = StatusCode.BAD_REQUEST
  }
}

module.exports = BadRequest
