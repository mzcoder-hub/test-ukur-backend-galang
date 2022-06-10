const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../models/index')
const User = require('../models').User

module.exports = {
  signup(req, res) {
    return User.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
      .then((user) => {
        res.status(200).send({
          auth: true,
          user: user,
          message: 'User registered successfully!',
          errors: null,
        })
      })
      .catch((err) => {
        res.status(500).send({
          auth: false,
          message: 'Error',
          errors: err,
        })
      })
  },

  signin(req, res) {
    return User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        )
        if (!passwordIsValid) {
          return res.status(401).send({
            auth: false,
            accessToken: null,
            message: 'Error',
            errors: 'Invalid Password!',
          })
        }
        const token = jwt.sign({ id: user.dataValues.id }, process.env.SECRET)

        res.status(200).send({
          auth: true,
          user: user,
          accessToken: token,
          message: 'User logged in successfully!',
          errors: null,
        })
      })
      .catch((err) => {
        res.status(500).send({
          auth: false,
          message: 'Error',
          errors: err,
        })
      })
  },
}
