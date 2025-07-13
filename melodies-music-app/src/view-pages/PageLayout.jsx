import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer from '../components/Footer/Footer';
import '../style/PageLayout.css'; // Đảm bảo bạn tạo file CSS này

const PageLayout = ({ children }) => {
  return (
    <div className="body">
      <div className="layout">
        <Sidebar />
        <div className="main-content">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
