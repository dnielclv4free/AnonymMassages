// const authMiddleware = require('../middleware/authMiddleware');
const Message = require('../models/Message');

const messages = [];
const createMessage= async (req,res) => {
  try {
    const {content}=req.body;

    if(!content){
      return res.status(400).json({success :false, message:"Content is required"})
    }
    const authorId = req.user.id;
    
    const newMessages = new Message({
      content : content,
      author : authorId,
    });

    const savedMessage = await newMessages.save();

    res.status(201).json({success:true,data: savedMessage});

  }catch(error){
    res.status(500).json({success : false , message :" Server error while creating message1.", error : error.message});
  }
};

const getAllMessages = async(req,res)=> {
  try {
    const messages = await Message.find().sort({createdAt:-1});

    res.status(200).json({success : true, data: messages});
  }catch(error){
    res.status(500).json({success: false, message:"Server error while fetching messages."});
  }
};

module.exports = {
  createMessage,
  getAllMessages,
};
