const mongoose = require('mongoose');

// Define the Order schema
const cartSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  items:[{
    productID:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        required: true
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    totalPrice:{
        type:Number,
        required:true
    }
  }]

}, {
  timestamps: true, 
});

module.exports = mongoose.model('Cart', cartSchema);
