const verifySignUpController = require('../api').verifySignUp
const verifySignController = require('../api').verifySign
const verifyJwtTokenController = require('../api').verifyJwtToken
const generateMember = require('../api').generateMember

module.exports = function (app) {
  app.post(
    '/api/auth/signup',
    [verifySignUpController.checkDuplicateUserNameOrEmail],
    verifySignController.signup
  )

  app.post('/api/auth/signin', verifySignController.signin)

  app.post('/api/generate/member', generateMember.addMember)

  app.get(
    '/api/generate/member/get',
    [verifyJwtTokenController.verifyToken],
    generateMember.getDataMember
  )
}
