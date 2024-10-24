const express = require('express')
const loginController = require('../controllers/login.controller')

const loginRouter = express.Router()

loginRouter.get('/', loginController.login)
loginRouter.post('/', loginController.loginPost)

module.exports = {
  loginRouter
}