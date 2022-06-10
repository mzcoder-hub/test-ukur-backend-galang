var getSeeder = require('../seeders/sample.json')
const MembersModel = require('../models').Members

module.exports = {
  addMember: function (req, res) {
    var getDataMember = getSeeder

    getDataMember.forEach(function (member) {
      if (member.details[0].balance <= 10000) {
        return MembersModel.create({
          id: member._id,
          name: member.details[0].name,
          balance: member.details[0].balance,
          transportation: member.favoriteTransportation,
        })
      }
    })
  },

  getDataMember: function (req, res) {
    // res.status(200).send({
    //   auth: true,
    //   // members: members,
    //   message: 'User registered successfully!',
    //   errors: null,
    // })

    MembersModel.findAll()
      .then(function (members) {
        res.status(200).send({
          auth: true,
          members: members,
          message: 'User registered successfully!',
          errors: null,
        })
      })
      .catch(function (err) {
        return res.status(500).send({
          auth: false,
          message: 'Error',
          errors: err,
        })
      })
  },
}
