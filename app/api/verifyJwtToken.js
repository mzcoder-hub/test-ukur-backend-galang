const jwt = require('jsonwebtoken')
const User = require('../models').User

module.exports = {
  verifyToken(req, res, next) {
    let tokenHeader = req.headers['authorization']

    // console.log(tokenHeader)
    if (!tokenHeader) {
      return res.status(500).send({
        auth: false,
        message: 'Error',
        errors: 'No token provided.',
      })
    } else {
      if (tokenHeader.split(' ')[0] !== 'Bearer') {
        return res.status(500).send({
          auth: false,
          message: 'Error',
          errors: 'Incorrect token format',
        })
      }

      let token = tokenHeader.split(' ')[1]

      if (!token) {
        return res.status(403).send({
          auth: false,
          message: 'Error',
          errors: 'No token provided',
        })
      }

      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          return res.status(500).send({
            auth: false,
            message: 'Error',
            errors: err,
          })
        }
        req.userId = decoded.id
        next()
      })
    }
  },

  isLoggined(req, res, next) {
    User.findById(req.userId)
      .then((user) => {
        next()
      })
      .catch((err) => {
        return res.status(500).send({
          auth: false,
          message: 'Error',
          errors: err,
        })
      })
  },
}
