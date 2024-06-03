const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const Product = require('../models/productsModel')

const calculateTotalPrice = async (cart) => {
  let totalPrice = 0;
  for (const item of cart.products) {
    const product = await Product.findById(item.productId);
    totalPrice += product.price * item.quantity;
  }
  cart.totalPrice = totalPrice;
  await cart.save();
};

// Add item to cart
const UserCart= async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.params.userId;
    try {
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        let cart = await Cart.findOne({ userId });
        if (!cart) {
          cart = new Cart({ userId, products: [] });
        }
    
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex === -1) {
          cart.products.push({ productId, quantity });
          await cart.populate('products.productId');
          cart.calculateTotals();
          await cart.save();
          return res.status(200).json({ message: 'Product added to cart', cart });
        } else {
          return res.status(400).json({ message: 'Product already in cart' });
        }
    
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }

}



const increaceCart= async (req, res) => {
 
    const { productId, quantity } = req.body;
    const userId = req.params.userId;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
        await cart.populate('products.productId');
        cart.calculateTotals();
        await cart.save();
        return res.status(200).json({ message: 'Product quantity increased', cart });
      } else {
        return res.status(404).json({ message: 'Product not in cart' });
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  

  
const decreaceCart= async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity -= quantity;
        if (cart.products[productIndex].quantity <= 0) {
          cart.products.splice(productIndex, 1);
        }
        await cart.populate('products.productId');
        cart.calculateTotals();
        await cart.save();
        return res.status(200).json({ message: 'Product quantity decreased', cart });
      } else {
        return res.status(404).json({ message: 'Product not in cart' });
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  






// Get cart
  const getCartById = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const cart = await Cart.findOne({ userId }).populate('products.productId');
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  



module.exports = {
    UserCart,
    getCartById,
    increaceCart,
    decreaceCart
}
