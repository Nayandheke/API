const express = require('express')
const productRoutes = require('./product.route')
const listRoutes = require('./list.route')

const router = express.Router()

router.use(productRoutes)
router.use(listRoutes)

module.exports = router