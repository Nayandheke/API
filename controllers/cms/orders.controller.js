const { default: mongoose } = require("mongoose")
const { showError } = require("../../lib")
const { Order, OrderDetail } = require("../../models")
const { orders } = require("../profile/profile.controller")

class OrdersController {
    index =  async (req,res,next) => {
        try {
            const orders = await Order.aggregate([
                {$lookup: {from: 'users', localField: 'userId', foreignField: '_id', as: 'user'}}
            ]).exec()

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
                user: order.user[0]
            })
            }
                
            res.json(result)
            
        } catch (err) {
            showError(err,next)
            
        }
    }

    update =  async (req,res,next) => {
        try {
            const {status} = req.body

            const order = await Order.findByIdAndUpdate(req.params.id, { status })

            if(order) {
                res.json({
                    success: 'Order updated.'
                })       
            }
            else{
                next({
                    message: 'Order not found',
                    status: 404
                })
            }     
        } catch (err) {
            validationError(err,next)
        }
    }

    destroy =  async (req,res,next) => {
        try {
            await OrderDetail.deleteMany({orderId: req.params.id})
            
            const order = await Order.findByIdAndDelete(req.params.id)
            if(order){
                res.json({
                    success: 'Order removed.'
                })            
            }
            else{
                next({
                    message: 'Order not found',
                    status: 404
                })
            } 
        } catch (err) {
            showError(err, next)
        }
    }

}

module.exports = new OrdersController