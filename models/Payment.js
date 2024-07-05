const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  stripeId: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
