const router = require('express').Router()

//? middleware
const verfyToken = require('../helpers/verify-token')

const PurchaseController = require('../controller/PurchaseController')

router.post('/addcar/:id', verfyToken, PurchaseController.addCar)

module.exports = router