const {Schema, model} = require('mongoose')

const OrderDetail = model('OrderDetail', new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required : true
    },
    total: {
        type: Number,
        required: true,
    }
},{
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
})
)

module.exports = OrderDetail