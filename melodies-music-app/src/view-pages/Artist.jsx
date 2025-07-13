import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Layout/Dashboard';
import Footer from '../components/Layout/Footer';
import '../style/PageLayout.css';
import '../App.css';
import ArtistPage from "../pages/Artist/index";


const HomePage = () => {
      
    return (
      <div className="body">
        <div style={{ display: 'flex', width: '100%' }}>
          <Dashboard />
          <ArtistPage />
          <Footer />
        </div>
      </div>
    );
  };
  
  export default ArtistPage;