////mongoose schema
//import mongoose from 'mongoose';
//import bcryptjs from 'bcryptjs';
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const saltRounds = 10 ; 

const full_Name = new mongoose.Schema ({
  first_name : {type : String, required : true},
  middle_name : {type : String, required : true},
  last_name : {type : String, required : true}
});

const userSchema= new mongoose.Schema({
  name : full_Name,
  username : {type : String, unique : true, required : true},
  email : {type : String, unique : true, required : true},
  password : {type : String, required : true}
});

userSchema.pre('save', async function(next){
  if (this.isModified('password')) {
    this.password = await bcryptjs.hash(this.password, saltRounds);
  }
  next();
});

const User = mongoose.model('User',userSchema);
module.exports= User ;

