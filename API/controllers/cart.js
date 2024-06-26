const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const Product = require('../models/productsModel')

const addToCart = async (req, res) => {
    const { userId, sessionId, productId, quantity } = req.body;
    if (!productId) {
      return res.json({ message: 'ProductId is required',error_type:1 });
    }
    
    if (userId) {
      try {
        const product = await Product.findById(productId);
        if (!product) {
          return res.json({ message: 'Product not found' ,error_type:1 });
        }
  
        let cart = await Cart.findOne({ userId }).populate('products.productId');
        if (cart) {
          const productIndex = cart.products.findIndex(p => p.productId && p.productId.equals(productId));
          if (productIndex > -1) {
            // cart.products[productIndex].quantity += quantity;
            return res.json({ message: 'Item already in cart', error_type: 2 })
          } else {
            cart.products.push({ productId, quantity });
          }
        } else {
          cart = new Cart({
            userId,
            products: [{ productId, quantity }]
          });
        }
  
        await cart.calculateTotals();
        await cart.save();
        await cart.populate('products.productId');
        res.json({ message: 'Item added to cart', cart ,Added:true,});
      } catch (error) {
        console.error(error);
        res.json({ message: 'Internal server error' ,error_type:1});
      }
    } else if (sessionId) {
      // Handle session-based user
      try {
        const product = await Product.findById(productId);
        if (!product) {
          return res.json({ message: 'Product not found'  ,error_type:1});
        }
  
        let cart = await Cart.findOne({ sessionId }).populate('products.productId');
        if (cart) {
          const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
          if (productIndex > -1) {
            // cart.products[productIndex].quantity += quantity;
            return res.json({ message: 'Item already in cart', error_type: 2 })
          } else {
            cart.products.push({ productId, quantity });
          }
        } else {
          cart = new Cart({
            sessionId,
            products: [{ productId, quantity }]
          });
        }
  
        await cart.calculateTotals();
        await cart.save();
        await cart.populate('products.productId');
        res.json({ message: 'Item added to cart', cart ,Added:true});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' ,error_type:1});
      }
    } else {
      res.json({ message: 'UserId or sessionId is required' });
    }
  }
  



const increaceCart= async (req, res) => {
    const { userId, sessionId, productId, quantity } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'ProductId is required' });
    }
    if (userId) {
        // Handle logged-in user
        try {
          let cart = await Cart.findOne({ userId }).populate('products.productId');
          if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
          }
    
          const productIndex = cart.products.findIndex(p => p.productId &&  p.productId.equals(productId));
          if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
            await cart.calculateTotals();
            await cart.save();
            await cart.populate('products.productId');
            return res.json({ message: 'Product quantity increased', cart });
          } else {
            return res.status(404).json({ message: 'Product not in cart' });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      } else if (sessionId) {
        // Handle session-based user
        try {
          let cart = await Cart.findOne({ sessionId }).populate('products.productId');
          if (!cart) {
            return res.json({ message: 'Cart not found' });
          }
    
          const productIndex = cart.products.findIndex(p =>  p.productId && p.productId.equals(productId));
          if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
            await cart.calculateTotals();
            await cart.save();
            await cart.populate('products.productId');
            return res.json({ message: 'Product quantity increased', cart });
          } else {
            return res.status(404).json({ message: 'Product not in cart' });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      } else {
        return res.status(400).json({ message: 'UserId or sessionId is required' });
      }
   
   
  }
  

  
const decreaceCart= async (req, res) => {
        const { userId, sessionId, productId, quantity } = req.body;
        if (!productId) {
          return res.status(400).json({ message: 'ProductId is required' });
        }
        
     if (userId) {
    // Handle logged-in user
    try {
      let cart = await Cart.findOne({ userId }).populate('products.productId');
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      const productIndex = cart.products.findIndex(p => p.productId &&  p.productId.equals(productId));
      if (productIndex !== -1) {
        const product = cart.products[productIndex];
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          // cart.products.splice(productIndex, 1);
          return res.status(400).json({ message: 'Product quantity cannot be less than 1' })
        }
        await cart.calculateTotals();
        await cart.save();
        await cart.populate('products.productId');
        return res.json({ message: 'Product quantity decreased', cart });
      } else {
        return res.status(404).json({ message: 'Product not in cart' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else if (sessionId) {
    // Handle session-based user
    try {
      let cart = await Cart.findOne({ sessionId }).populate('products.productId');
      if (!cart) {
        return res.json({ message: 'Cart not found' });
      }

      const productIndex = cart.products.findIndex(p => p.productId &&  p.productId.equals(productId));
      if (productIndex !== -1) {
        const product = cart.products[productIndex];
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          cart.products.splice(productIndex, 1);
        }
        await cart.calculateTotals();
        await cart.save();
        await cart.populate('products.productId');
        return res.json({ message: 'Product quantity decreased', cart });
      } else {
        return res.status(404).json({ message: 'Product not in cart' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(400).json({ message: 'UserId or sessionId is required' });
  }
      };
    
  


// Get cart
  const getCartById = async (req, res) => {
  const { userId, sessionId } = req.query;

    if (!userId && !sessionId) {
        return res.status(400).json({ message: 'UserId or sessionId is required' });
      }
    
      try {
        let cart;
    
        if (userId) {
          // Prioritize userId for logged-in users
          cart = await Cart.findOne({ userId }).populate('products.productId');
        } else {
          // Use sessionId for guest users
          cart = await Cart.findOne({ sessionId }).populate('products.productId');
        }
    
        if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
        }
    
        await cart.calculateTotals();
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
      };
      


  const removeCart= async (req, res) => {
    const { userId, sessionId, productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'ProductId is required' });
    }
    if (userId) {
        // Handle logged-in user
        try {
          let cart = await Cart.findOne({ userId }).populate('products.productId');
          if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
          }
    
          const productIndex = cart.products.findIndex(p =>p.productId &&  p.productId.equals(productId));
          if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            await cart.calculateTotals();
            await cart.save();
            await cart.populate('products.productId');
            return res.json({ message: 'Product removed from cart', cart });
          } else {
            return res.status(404).json({ message: 'Product not in cart' });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      } else if (sessionId) {
        // Handle session-based user
        try {
          let cart = await Cart.findOne({ sessionId }).populate('products.productId');
          if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
          }
    
          const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
          if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            await cart.calculateTotals();
            await cart.save();
            await cart.populate('products.productId');
            return res.json({ message: 'Product removed from cart', cart });
          } else {
            return res.status(404).json({ message: 'Product not in cart' });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      } else {
        return res.status(400).json({ message: 'UserId or sessionId is required' });
      }

  }

  
  const ClearAllCart= async (req, res) => {
    const { userId, sessionId } = req.body;

    if (userId) {
        // Handle logged-in user
        try {
          let cart = await Cart.findOne({ userId });
          if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
          }
    
          cart.products = [];
          await cart.calculateTotals();
          await cart.save();
          return res.status(200).json({ message: 'Cart cleared', cart });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      } else if (sessionId) {
        // Handle session-based user
        try {
          let cart = await Cart.findOne({ sessionId });
          if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
          }
    
          cart.products = [];
          await cart.calculateTotals();
          await cart.save();
          return res.status(200).json({ message: 'Cart cleared', cart });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      } else {
        return res.status(400).json({ message: 'UserId or sessionId is required' });
      }
}















  


module.exports = {
    getCartById,
    increaceCart,
    decreaceCart,
    removeCart,
    ClearAllCart,
    addToCart
}
