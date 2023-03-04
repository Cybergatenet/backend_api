import mongoose from 'mongoose';
const userSchema = {
  acc_name: { type: String, required: true },
  mobile: { type: String, required: true },
  acc_number: { type: String, required: true },
  bank: { type: String, required: true },
};

const paymentSchema = {
  paymentMethod: { type: String, required: true }
};

const fundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
  amount: { type: String, required: true },
  funds: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'fund',
    required: true
  },
});

const paidSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderItems: [orderItemSchema],
  payment: paymentSchema,
  amount: { type: Number },
  taxPrice: { type: Number },
  totalPrice: { type: Number },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
}, {
  timestamps: true
});

const orderModel = mongoose.model("Fund", paidSchema);
export default fundModel;