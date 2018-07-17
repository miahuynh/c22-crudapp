const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { 
    type: String,
    required: true, 
    unique: true,
  },
  password: String,
  sessionId: {
    type: String,
    expires: 120,
  },
})

const Todo = mongoose.model('User', userSchema);
module.exports = Todo;


// making a hook for 
// userSchema.pre('save', (user) => {
//   user.password = bcrypt.hash(user.password);
// })