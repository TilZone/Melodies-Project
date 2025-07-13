// Home, Discover	
// Tiêu đề từng section	
// props title 
// dùng chung
// src/components/Home/SectionTitle.jsx
import React from 'react';

const SectionTitle = ({ title }) => {
  return (
    <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">
      {title}
    </h2>
  );
};

export default SectionTitle;
