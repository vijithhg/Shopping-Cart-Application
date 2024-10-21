const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    orderHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }],
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer',
    },

},
    {
        timestamps: true
    })


module.exports = mongoose.model('user', userSchema)