import User from '../models/User.js';
import Earning from '../models/Earning.js';
import { calculateProfit } from '../utils/calculateProfit.js';
import { notifyUser } from '../sockets/socket.js';

export const addPurchase = async (req, res) => {
  try {
    const { userId, amount } = req.body;
    if (amount <= 1000) return res.status(400).json({ message: 'Purchase amount must exceed ₹1000' });

    const user = await User.findById(userId).populate('parent');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Record earnings for Parent (Level 1)
    if (user.parent) {
      const parent = user.parent; // Now parent is a single user, not an array
      const level1Profit = calculateProfit(amount, 1);

      parent.earnings += level1Profit;
      await parent.save();  // This works now because parent is a single document

      await Earning.create({
        user: parent._id,
        source: user._id,
        level: 1,
        amount: level1Profit,
        purchaseAmount: amount,
      });

      notifyUser(parent._id.toString(), {
        message: `You earned ₹${level1Profit} from a purchase by ${user.name}`,
        level: 1,
      });
    }

    // Record earnings for Grandparent (Level 2)
    if (user.parent && user.parent.parent) {
      const grandparent = user.parent.parent;
      const level2Profit = calculateProfit(amount, 2);

      grandparent.earnings += level2Profit;
      await grandparent.save(); // This works now because grandparent is also a single user

      await Earning.create({
        user: grandparent._id,
        source: user._id,
        level: 2,
        amount: level2Profit,
        purchaseAmount: amount,
      });

      notifyUser(grandparent._id.toString(), {
        message: `You earned ₹${level2Profit} from a Level 2 referral purchase by ${user.name}`,
        level: 2,
      });
    }

    res.status(201).json({ message: 'Purchase processed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getEarningsReport = async (req, res) => {
  const { userId } = req.params;

  try {
    const earnings = await Earning.find({ user: userId })
      .populate('source', 'name email') // populate the source user info
      .sort({ createdAt: -1 });

    if (!earnings) {
      return res.status(404).json({ message: 'No earnings found' });
    }

    res.status(200).json({ earnings });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching earnings report' });
  }
};

export const getReferralEarningsBreakdown = async (req, res) => {
  const { userId } = req.params;

  try {
    const level1Earnings = await Earning.aggregate([
      { $match: { user: userId, level: 1 } },
      { $group: { _id: '$user', totalEarnings: { $sum: '$amount' } } },
    ]);

    const level2Earnings = await Earning.aggregate([
      { $match: { user: userId, level: 2 } },
      { $group: { _id: '$user', totalEarnings: { $sum: '$amount' } } },
    ]);

    res.status(200).json({
      level1Earnings: level1Earnings,
      level2Earnings: level2Earnings,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching referral earnings breakdown' });
  }
};