const { default: mongoose } = require("mongoose")
const { showError } = require("../../lib")
const { User, Review, Order, Product, OrderDetail } = require('../../models')
const bcrypt = require('bcryptjs')
const { show } = require("../cms/products.controller")

class ProfileController {

    details = async (req, res, next) => {
        res.json(req.user)
    }

    profile = async (req, res, next) => {
        try {
            const { name, phone, address } = req.body

            const user = await User.findByIdAndUpdate(req.user._id, { name, phone, address })

            if (user) {
                res.json({
                    success: 'Profile updated.'
                })
            }
            else {
                next({
                    message: 'Profile not found',
                    status: 404
                })
            }
        } catch (err) {
            let message = {}
            if ('errors' in err) {
                for (let k in err.errors) {
                    message = {
                        ...message, [k]: err.errors[k].message
                    }
                }
            }
            else {
                showError(err, next)
            }
            next({
                message,
                status: 422
            })

        }
    }

    password = async (req, res, next) => {
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body

            if (bcrypt.compareSync(oldPassword, req.user.password)) {
                if (newPassword == confirmPassword) {

                    const hash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))

                    const user = await User.findByIdAndUpdate(req.user._id, { password: hash })

                    if (user) {
                        res.json({
                            success: 'Password updated.'
                        })
                    }
                    else {
                        next({
                            message: 'Profile not found',
                            status: 404
                        })
                    }

                }
                else {
                    next({
                        message: 'password not confirmed',
                        status: 404
                    })
                }
            }
            else {
                next({
                    message: 'Old Password is incorrect.',
                    status: 422
                })
            }
        } catch (err) {
            let message = {}
            if ('errors' in err) {
                for (let k in err.errors) {
                    message = {
                        ...message, [k]: err.errors[k].message
                    }
                }
            }
            else {
                showError(err, next)
            }
            next({
                message,
                status: 422
            })

        }
    }

    AddReview = async (req, res, next) => {
        try {
            const { rating, comment } = req.body

            await Review.create({
                rating, comment, userId: req.user._id,
                productId: req.params.id
            })

            res.json({
                success: 'Thank you for your review.'
            })

        } catch (err) {
            showError(err, next)
        }
    }

    reviews = async (req, res, next) => {
        try {
            const reviews = await Review.aggregate([
                { $match: { userId: new mongoose.Types.ObjectId(req.user._id) } },
                { $lookup: { from: 'products', localField: 'productId', foreignField: '_id', as: 'product' } }
            ]).exec()

            const result = reviews.map(review => {
                return {
                    "_id": review._id,
                    "comment": review.comment,
                    "rating": review.rating,
                    "productId": review.productId,
                    "userId": review.userId,
                    "createdAt": review.createdAt,
                    "updatedAt": review.updatedAt,
                    "__v": review.__v,
                    product: review.product[0],
                }
            })

            res.json({
                result
            })

        } catch (err) {
            showError(err, next)
        }
    }

    checkout = async (req, res, next) => {
        try {
            const cart = req.body

            const order = await Order.create({ userId: req.user._id })

            for (let item of cart) {
                const product = await Product.findById(item.productId)
                const price = product.discounted_price ? product.discounted_price : product.price
                await OrderDetail.create({ orderId: order._id, productId: item.productId, qty: item.qty, price, total: (price * item.qty) })
            }

            res.json({
                success: "Thank you for your order."
            })

        } catch (err) {
            showError(err, next)

        }
    }

    orders = async (req, res, next) => { 
        try {
            const orders = await Order.find({userId: req.user._id}).exec()

            const result = []

            for(let order of orders){
                const details = await OrderDetail.aggregate([
                    {$match: {orderId: new mongoose.Types.ObjectId(order._id)}},
                    {$lookup: {from: 'products', localField: 'productId', foreignField: '_id', as: 'product'}}
                ]).exec()

            const temp = details.map(details => {
                return{
                    _id: details._id,
                    orderId: details.orderId,
                    productId: details.productId,
                    qty: details.qty,
                    price: details.price,
                    total: details.total,
                    createdAt: details.createdAt,
                    updatedAt: details.updatedAt,
                    __v: details.__v,
                    product: details.product[0],
                }
            })

            result.push({
                _id: order._id,
                userId: order.userId,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                __v: order.__v,
                details: temp,
            })
            }
                
            res.json(result)
            
        } catch (err) {
            showError(err,next)
            
        }
    }

}

module.exports = new ProfileController