const mongoose = require('mongoose');
// import {MongoClient} from "mongodb";
const dotenv = require('dotenv').config();

const cors = require ('cors');
const express = require('express');
const authRoutes = require('./routes/auth');
const app = express();
const conn = mongoose.connection;


app.use(cors()); // Mengizinkan akses dari domain lain (frontend)
app.use(express.json()); // Mem-parsing body request menjadi JSON

app.get('/', (req, res) => {
  res.send('Server API Berjalan');
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//mongodb config
const DB_URL = process.env.MONGO_URI;
mongoose.connect(DB_URL);

conn.once('open', ()=> {
  console.log('Successfully connectec to database');
})

conn.on('error', () => {
  console.log('Failed connect to database');
})
