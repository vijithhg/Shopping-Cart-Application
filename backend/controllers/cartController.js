const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const addItemToCart = async (req, res) => {
  const { productID, quantity } = req.body;
  if(!productID ){
    return res.status(400).json({
      message:'Product required'
    })
  }
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({
      message: 'Authentication required',
    });
  }

  let userID;

  try {
    // Verify the token and extract userID
    const decoded = jwt.verify(token, 'test'); // Replace 'test' with your actual secret
    userID = decoded.id;
  } catch (err) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  // Find the user
  const user = await User.findById(userID); // No need for `{_id: userID}`
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Find the product
  const product = await Product.findById(productID); // No need for `{_id: productID}`
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Check if the cart exists for the user
  let cart = await Cart.findOne({ userID });

  if (!cart) {
    // If no cart exists, create a new one
    cart = new Cart({
      userID,
      items: [],
      totalAmount: 0,
    });
  }

  // Check if the product already exists in the cart
  const existingItemIndex = cart.items.findIndex(item => item.productID.toString() === productID);

  if (existingItemIndex > -1) {
    // Update quantity if the item already exists
    cart.items[existingItemIndex].quantity += quantity;
    cart.items[existingItemIndex].totalPrice = cart.items[existingItemIndex].quantity * product.price;
  } else {
    // Add the product to the cart as a new item
    const totalPrice = product.price * quantity;
    cart.items.push({
      productID,
      quantity,
      totalPrice,
    });
  }

  // Update the total amount for the cart
  cart.totalAmount = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);

  // Save the cart
  try {
    const updatedCart = await cart.save();
    res.status(200).json({
      message:'Cart updated successfully',
      updatedCart
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user's cart
const getCartByUser = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; 
  let userID

  try {
    const decoded = jwt.verify(token, 'test'); 
    userID = decoded.id;
    const cart = await Cart.findOne({ userID }).populate('items.productID');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    const updatedCart = {
      ...cart._doc,
      items: cart.items.map(item => ({
        ...item._doc,
        productID: {
          ...item.productID._doc,
          image: `${process.env.BACKEND_URL}/uploads/${item.productID.image}`
        }
      }))
    };
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update quantity of an item in the cart
const updateCartItem = async (req, res) => {
  const { productID, quantity } = req.body;
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (!token) {
    return res.status(403).json({
      message: 'Authentication required',
    });
  }

  let userID;

  try {
    const decoded = jwt.verify(token, 'test'); 
    userID = decoded.id;
    const cart = await Cart.findOne({ userID });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    const itemIndex = cart.items.findIndex(item => item.productID.toString() === productID);

    if (itemIndex > -1) {
      // Update quantity and total price
      cart.items[itemIndex].quantity = quantity;
      const product = await Product.findById(productID);
      cart.items[itemIndex].totalPrice = cart.items[itemIndex].quantity * product.price;

      // Update total amount of the cart
      cart.totalAmount = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);

      // Save the updated cart
      const updatedCart = await cart.save();
      res.status(200).json(updatedCart);
    } else {
      res.status(404).json({ message: 'Item not found in the cart' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove an item from the cart
const removeItemFromCart = async (req, res) => {
  const { productID } = req.body;
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (!token) {
    return res.status(403).json({
      message: 'Authentication required',
    });
  }
  let userID;
  try {
    const decoded = jwt.verify(token, 'test'); 
    userID = decoded.id;
    const cart = await Cart.findOne({ userID });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    // Remove the item from the cart
    cart.items = cart.items.filter(item => item.productID.toString() !== productID);

    // Update the total amount of the cart
    cart.totalAmount = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);

    // Save the updated cart
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Clear the cart
const clearCart = async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(403).json({
      message: 'Authentication required',
    });
  }

  let userID;

  try {
    const decoded = jwt.verify(token, 'test'); 
    userID = decoded.id;
    const cart = await Cart.findOne({ userID });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    // Clear the items and reset the total amount
    cart.items = [];
    cart.totalAmount = 0;

    // Save the cleared cart
    const updatedCart = await cart.save();
    res.status(200).json({ message: 'Cart cleared successfully', cart: updatedCart });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addItemToCart,
  getCartByUser,
  updateCartItem,
  removeItemFromCart,
  clearCart,
};