const mongoose = require('mongoose');
const Schema = mongoose.Schema;

UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  blood_type: { type: String, required: true }
});

// consider server error too
UserSchema.methods.comparePassword = function(password, cb){
  // console.log("passcheckr");
  if (password == this.password) {
    // console.log("pass match")
    return cb(null, this);
  } else {
    console.log("pass didn't match")
    return cb(null, false);
  }
}

module.exports = mongoose.model('User', UserSchema);