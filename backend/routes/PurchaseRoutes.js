const router = require('express').Router()

//? middleware
const verfyToken = require('../helpers/verify-token')

const PurchaseController = require('../controller/PurchaseController')

router.post('/addcar/:id', verfyToken, PurchaseController.addCar)
router.post('/remove/:id', verfyToken, PurchaseController.removeAndDecrementItem)
router.post('/purchasecomplete', verfyToken, PurchaseController.purchaseComplete)
router.get('/purchaseshistoric', verfyToken, PurchaseController.purchasesHistoric)

module.exports = router