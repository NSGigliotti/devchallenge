const router = require('express').Router()

const ProductController = require('../controller/ProductController')

//? helpers
const verifyToken = require('../helpers/verify-token')
const verfyTokenSeller = require('../helpers/verify-token-seller')
const { imageUpload } = require('../helpers/image-uoload')

router.post('/registercategory', verfyTokenSeller, ProductController.registerCategory)
router.post('/registerprofuct', verfyTokenSeller, imageUpload.array('images'), ProductController.registerItem)

module.exports = router