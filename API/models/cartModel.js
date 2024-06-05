const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartProductSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, default: 1 }
});

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId,  ref: 'User', sparse: true},
  sessionId: { type: String , sparse: true},
  products: [cartProductSchema],
  totalQuantity: { type: Number, required: true, default: 0 },
  totalPrice: { type: Number, required: true, default: 0 }
}, { timestamps: true });

cartSchema.index({ userId: 1 }, { unique: true, sparse: true });
cartSchema.index({ sessionId: 1 }, { unique: true, sparse: true })
cartSchema.methods.calculateTotals = function () {
    const self = this;
    return mongoose.model('Product').populate(this, 'products.productId')
      .then(function(cart) {
        self.totalQuantity = cart.products.reduce((acc, item) => acc + item.quantity, 0);
        self.totalPrice = cart.products.reduce((acc, item) => acc + (item.quantity * item.productId.price), 0);
      });
  };
  

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
