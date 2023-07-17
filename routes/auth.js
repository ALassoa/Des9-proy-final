const express = require('express')
const Router = express.Router()

const authControllers = require('../controllers/authControllers')

Router.post('/register', authControllers.register)
Router.post('/login', authControllers.login)

module.exports = Router