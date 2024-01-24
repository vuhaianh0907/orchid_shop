import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['customer', 'staff', 'manager', 'admin'],
  },
  isActive: {
    type: Boolean,
    required: true,
  },
},{
  timestamps:true
});

accountSchema.pre('save', async function(next){
  if(!this.isModified('password')){
      next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

accountSchema.methods.matchPasswords = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

const Account = mongoose.model('Account', accountSchema);

export default Account;