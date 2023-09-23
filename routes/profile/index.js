const express = require('express')
const { ProfileCtrl } = require('../../controllers')

const router = express.Router()

router.get('/profile/details', ProfileCtrl.details)

router.put('/profile/edit', ProfileCtrl.profile)
router.patch('/profile/edit', ProfileCtrl.profile)

router.put('/profile/password', ProfileCtrl.password)
router.patch('/profile/password', ProfileCtrl.password)

router.post('/products/:id/review', ProfileCtrl.AddReview)

router.get('/profile/reviews', ProfileCtrl.reviews)

router.get('/profile/orders', ProfileCtrl.orders)

router.post('/checkout', ProfileCtrl.checkout)



module.exports = router