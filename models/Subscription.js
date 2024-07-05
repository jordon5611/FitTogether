const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    endDate: {
      type: Date,
      required: true
    },
    planId: {
      type: String,
      required: true
    },
    type:{
      type: String,
      required: true
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
      required: true
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Subscription', SubscriptionSchema);
  