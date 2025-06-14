const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');

// Panggil dotenv.config() di awal
dotenv.config();

// 1. Impor semua rute yang dibutuhkan
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages'); // <-- PERBAIKAN: Impor messageRoutes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rute
app.get('/', (req, res) => {
  res.send('Server API Berjalan');
});
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Konfigurasi Port
const PORT = process.env.PORT || 5001;

// 2. PERBAIKAN: Hubungkan ke DB dulu, baru jalankan server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to database');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to database', error);
    process.exit(1); // Hentikan proses jika koneksi ke DB gagal
  }
};

// Panggil fungsi untuk memulai server
startServer();
