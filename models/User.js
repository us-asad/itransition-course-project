import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 150
  },
  email: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 100
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 500
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
 }, {
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
