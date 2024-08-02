import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  _id: {
    required: true,
    auto: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  name: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UsersModel = mongoose.default.model('Users', userSchema);
