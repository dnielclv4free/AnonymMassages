const express = require('express');

const router= express.Router();

const {createMessage,getAllMessages}=require('../controllers/messageControllers');
const authMiddleware= require('../middleware/authMiddleware');

router.post('/',authMiddleware, createMessage);
router.get('/',getAllMessages);

module.exports= router;

