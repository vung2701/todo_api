import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema for User
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  refreshToken: { type: String },
});

// Middleware to hash password before saving
UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.toJson = function () {
  const user = this.toObject();
  delete user.password;
  delete user.refreshToken;
  return user;
};

// Method to compare password for login
UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Export the model
const User = mongoose.model('User', UserSchema);
export default User;
