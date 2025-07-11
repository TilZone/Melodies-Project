import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';

// Import routes
import songRoutes from './routes/song.routes';
import artistRoutes from './routes/artist.routes';
import discoverRoutes from './routes/discover.routes';

// Tải các biến môi trường
dotenv.config();

// Khởi tạo Express app
const app = express();
const PORT = process.env.PORT || 8080;

// Kết nối Database
connectDB();

// Middlewares
app.use(cors()); // Cho phép cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Định tuyến API
app.use('/api/songs', songRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/discover', discoverRoutes);

// Route cơ bản để kiểm tra server
app.get('/', (req, res) => {
  res.send('Chào mừng đến với Melodies API!');
});

// Lắng nghe kết nối
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});