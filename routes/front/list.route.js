const express = require('express')
const { Front } = require('../../controllers')

const router = express.Router()

router.get('/categories', Front.ListCtrl.categories )
router.get('/categories/:id', Front.ListCtrl.categoriesById )
router.get('/brands', Front.ListCtrl.brands )
router.get('/brands/:id', Front.ListCtrl.brandById )

module.exports = router