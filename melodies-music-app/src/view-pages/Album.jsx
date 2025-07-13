import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Layout/Dashboard';
import Footer from '../components/Layout/Footer';
import '../style/PageLayout.css';
import '../App.css';


const Album = () => {
  
  return (
    <div className="body">
      <div style={{ display: 'flex', width: '100%' }}>
        <Dashboard />
        <p>content here</p>
        {/* <HomeContent /> */}
        <Footer />
      </div>
    </div>
  );
};

export default Album;
