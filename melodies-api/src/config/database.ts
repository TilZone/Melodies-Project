import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      console.error("Lỗi: Biến môi trường DATABASE_URL chưa được đặt.");
      process.exit(1);
    }
    await mongoose.connect(dbUrl);
    console.log('✅ Kết nối MongoDB thành công!');
  } catch (error) {
    console.error('❌ Kết nối MongoDB thất bại:', error);
    process.exit(1);// Thoát ứng dụng nếu không kết nối được DB
  }
};

export default connectDB;