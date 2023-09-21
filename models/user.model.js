const { Schema, model } = require('mongoose') // importing schema and model from mongoose.

/*
const schema = new Schema({ // creating a new class for schema
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Admin', 'Staff', 'Customer'],
        default: 'Customer',
    },
    status: {
        type: Boolean,
        default: true,
    }
},{
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
})

const User = model('User', schema)

*/
// can do both

const User = model('User', new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Admin', 'Staff', 'Customer'],
        default: 'Customer',
    },
    status: {
        type: Boolean,
        default: true,
    }
},{
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
})
)

module.exports = User