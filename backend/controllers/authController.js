// const User = require('../models/User');
//
// const UserController = {
//   async register(req, res) {
//     try {
//       const newUser = new User(req.body);
//       await newUser.save();
//       res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//       res.status(400).json({ message: 'User registration failed' });
//     }
//   },
// };
//
// module.exports = UserController;
//
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser =async (req,res) => {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ message: 'User registration failed' });
    }
};
const loginUser = async(req, res)=> {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        console.log('User tidak ditemukan di database!');
        return res.status(401).json({ message: 'Authentication failed' });
      }
      console.log('User ditemukan:', user.username);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Apakah password valid:', isPasswordValid); 
      if (!isPasswordValid) {
        console.log('Password salah!');
        res.status(401).json({ message: 'Authentication failed' });
      }else{
        const payload = {
            id: user.id,
            username: user.username
        };
        const secretKey = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secretKey, {expiresIn : '1h'});
        res.status(200).json({
          message:'Authentication successful',
          token : token
        });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
    registerUser,
    loginUser
};
