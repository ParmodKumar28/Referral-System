import mongoose from 'mongoose';

const earningSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  level: {
    type: Number, // 1 for direct, 2 for indirect, etc.
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaseAmount: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const Earning = mongoose.model('Earning', earningSchema);
export default Earning;
