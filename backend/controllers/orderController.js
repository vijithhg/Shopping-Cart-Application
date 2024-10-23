const Order = require('../models/Order');
const User = require('../models/userModel');
const Product = require('../models/Product');

// Create a new order
const createOrder = async (req, res) => {
  const { userID, products } = req.body;

  try {
    // Fetch user from the database
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate the total amount and update product stock
    let totalAmount = 0;
    const orderItems = await Promise.all(products.map(async (item) => {
      const product = await Product.findById(item.productID);

      if (!product || product.stockQuantity < item.quantity) {
        throw new Error(`Product ${product.name} is out of stock or quantity exceeds available stock`);
      }

      // Update the stock
      product.stockQuantity -= item.quantity;
      await product.save();

      totalAmount += product.price * item.quantity;

      return {
        productID: product._id,
        quantity: item.quantity
      };
    }));

    // Create the new order
    const newOrder = new Order({
      userID,
      products: orderItems,
      totalAmount,
      orderDate: new Date()
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Add the order to the user's order history
    user.orderHistory.push(savedOrder._id);
    await user.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//getAllOrder
const getAllOrders = async(req,res)=>{
    try{
        const orders = await Order.find()
        res.status(200).json({
            orders
        })

    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

// Get order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate('products.productID');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all orders for a specific user
const getOrdersByUser = async (req, res) => {
  const { userID } = req.params;

  try {
    const orders = await Order.find({ userID }).populate('products.productID');
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an order (for example, update the status or cancel)
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { products } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Recalculate total amount and update stock for new products
    let totalAmount = 0;
    const updatedOrderItems = await Promise.all(products.map(async (item) => {
      const product = await Product.findById(item.productID);

      if (!product || product.stockQuantity < item.quantity) {
        throw new Error(`Product ${product.name} is out of stock or quantity exceeds available stock`);
      }

      // Adjust stock based on the updated order
      product.stockQuantity -= item.quantity;
      await product.save();

      totalAmount += product.price * item.quantity;

      return {
        productID: product._id,
        quantity: item.quantity
      };
    }));

    // Update the order details
    order.products = updatedOrderItems;
    order.totalAmount = totalAmount;

    // Save the updated order
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Remove the order from the user's order history
    const user = await User.findById(order.userID);
    if (user) {
      user.orderHistory = user.orderHistory.filter(
        (orderHistoryID) => orderHistoryID.toString() !== id
      );
      await user.save();
    }

    // Remove the order
    await Order.findByIdAndDelete(id)

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUser,
  updateOrder,
  deleteOrder,
};