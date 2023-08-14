const router = require('express').Router()

const UserController = require('../controller/UserController')

//? middleware
const verfyToken = require('../helpers/verify-token')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkUser', UserController.checkUser)
router.patch('/edit/:id', verfyToken, UserController.editUser)

module.exports = router