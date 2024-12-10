import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true, 
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    referrals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References direct referrals (children)
    }],
    earnings: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
