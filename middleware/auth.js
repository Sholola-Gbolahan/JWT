// 1. Setting up the middleware
const authorizationMiddleware = async (req, res, next) => {
  console.log(req.headers.authorization)
  next()
}

module.exports = authorizationMiddleware
