const express = require ('express')
const {Front} =require('../../controllers')

const router = express.Router()

router.get('/products/latest',Front.ProductCtrl.latest)
router.get('/products/featured',Front.ProductCtrl.featured)
router.get('/products/topselling',Front.ProductCtrl.topselling)
router.get('/products/search',Front.ProductCtrl.search)
router.get('/products/:id',Front.ProductCtrl.byId)
router.get('/products/:id/similar',Front.ProductCtrl.similar)
router.get('/categories/:id/products',Front.ProductCtrl.byCategoryId)
router.get('/brands/:id/products',Front.ProductCtrl.byBrandId)

module.exports= router