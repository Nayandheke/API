const express = require('express')
const { Cms } = require('../../controllers')
const { uploadFile } = require('../../lib')

const router = express.Router()

const mimeList = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']

router.route('/')
    .get(Cms.ProductsCtrl.index)
    .post(uploadFile(mimeList).array('images'), Cms.ProductsCtrl.store)

router.route('/:id')
    .get(Cms.ProductsCtrl.show)
    .put(uploadFile(mimeList).array('images'), Cms.ProductsCtrl.update)
    .patch(uploadFile(mimeList).array('images'), Cms.ProductsCtrl.update)
    .delete(Cms.ProductsCtrl.destroy)

router.delete('/:id/image/:filename', Cms.ProductsCtrl.image)


module.exports = router