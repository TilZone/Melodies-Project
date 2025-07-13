import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Layout/Dashboard';
import Footer from '../components/Layout/Footer';
import '../style/PageLayout.css';
import '../App.css';
import HomeContent from '../components/Home/HomeContent';

const HomePage = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/songs') // ← gọi API backend
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error('Lỗi lấy dữ liệu bài hát:', err));
  }, []);

  return (
    <div className="body">
      <div style={{ display: 'flex', width: '100%' }}>
        <Dashboard />
        <div>
        <HomeContent />
        <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
