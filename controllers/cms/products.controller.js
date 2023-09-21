const { showError, validationError } = require("../../lib")
const { Product } = require("../../models")
const { unlinkSync } = require('node:fs')

class productsController {
    index = async (req, res, next) => {
        try {
            const products = await Product.aggregate([
                { $lookup: { from: 'categories', localField: 'categoryId', foreignField: '_id', as: 'category' } },
                { $lookup: { from: 'brands', localField: 'brandId', foreignField: '_id', as: 'brand' } },
            ]).exec()

            let result = products.map(product => {
                return {
                    _id: product._id,
                    name: product.name,
                    summary: product.summary,
                    description: product.description,
                    price: product.price,
                    discounted_price: product.discounted_price,
                    image: product.images,
                    categoryId: product.categoryId,
                    brandId: product.brandId,
                    status: product.status,
                    featured: product.featured,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                    category: product.category[0],
                    brand: product.brand[0],
                    __v: product.__v,
                }
            })

            res.json(result)
        } catch (err) {
            showError(err, next)
        }
    }

    store = async (req, res, next) => {
        try {
            const { name, summary, description, price, discounted_price, categoryId, brandId, featured, status } = req.body

            let images = req.files.map(file => file.filename)

            await Product.create({ name, summary, description, price, discounted_price, categoryId, brandId, featured, status, images })
            res.status(201).json({
                success: 'Product created.'
            })
        }
        catch (err) {
            validationError(err, next)
        }
    }

    show = async (req, res, next) => {
        try {
            const products = await Product.findById(req.params.id)

            if (products) {
                res.json(products)
            }
            else {
                next({
                    message: 'Product not found',
                    status: 404
                })
            }

        } catch (err) {
            showError(err, next)
        }
    }

    update = async (req, res, next) => {
        try {
            const { name, summary, description, price, discounted_price, categoryId, brandId, featured, status } = req.body

            let product = await Product.findById(req.params.id);

            let images = [
                ...product.images,
                ...req.files.map(file => file.filename)
            ]

            const products = await Product.findByIdAndUpdate(req.params.id, { name, summary, description, price, discounted_price, categoryId, brandId, featured, status, images })

            if (products) {
                res.json({
                    success: 'Product updated.'
                })
            }
            else {
                next({
                    message: 'Product not found',
                    status: 404
                })
            }
        } catch (err) {
            validationError(err, next)
        }
    }

    destroy = async (req, res, next) => {
        try {

            let product = await Product.findById(req.params.id);

            for (let image of product.images) {
                unlinkSync(`uploads/${image}`)
            }


            product = await Product.findByIdAndDelete(req.params.id)
            if (product) {
                res.json({
                    success: 'Product removed.'
                })
            }
            else {
                next({
                    message: 'Product not found',
                    status: 404
                })
            }
        } catch (err) {
            showError(err, next)
        }
    }

    image = async (req, res, next) => {
        try {
            const {filename, id} = req.params

            let product = await Product.findById(id);

            if (product) {
                if(product.images.length > 1){

                    let temp = []
    
                    for (let image of product.images) {
                        if(filename == image) {
                            unlinkSync(`uploads/${image}`)
                        }
                        else {
                            temp.push(image)
                        }
                    }
                        await Product.findByIdAndUpdate(id, {images: temp})

                        res.json({
                            success: 'Product image removed.'
                        })
                } else{
                    next({
                        message: 'At least one image is must.',
                        status: 403,
                    })
                }
            }
            else {
                next({
                    message: 'Product not found',
                    status: 404,
                })
            }
        } catch (err) {
            showError(err, next)
        }
    }
}


module.exports = new productsController