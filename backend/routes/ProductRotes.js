const router = require('express').Router()

const ProductController = require('../controller/ProductController')

//? helpers
const verifyToken = require('../helpers/verify-token')
const verfyTokenSeller = require('../helpers/verify-token-seller')
const { imageUpload } = require('../helpers/image-uoload')

router.post('/registercategory', verfyTokenSeller, ProductController.registerCategory)
router.post('/registerproduct', verfyTokenSeller, imageUpload.array('images'), ProductController.registerItem)
router.get('/all', ProductController.getAll)
router.get('/:category', ProductController.getCategory)
router.get('/search/:search', ProductController.getSearch)


module.exports = router