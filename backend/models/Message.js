const mongoose = require('mongoose');
const User = require('./User')
const messageSchema = new mongoose.Schema({
  content : {type : String, required : true},
  author : {type : mongoose.Schema.Types.ObjectId, ref: 'User', required :true},},{
  timestamps : true,
});

const Message = mongoose.model('Message', messageSchema);
module.exports=Message;
