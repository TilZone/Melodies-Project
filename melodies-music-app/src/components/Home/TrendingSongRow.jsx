// src/components/Home/TrendingSongRow.jsx
import React from 'react';

const TrendingSongRow = ({ rank, img, title, artist, date, album, duration }) => {
  return (
    <div className="flex items-center bg-white rounded-lg shadow px-4 py-2 hover:shadow-md transition duration-300">
      <div className="text-lg font-semibold w-8 text-gray-700">#{rank}</div>
      <img src={img} alt={title} className="w-12 h-12 rounded-md object-cover mx-3" />
      <div className="flex-1">
        <h3 className="text-sm font-medium truncate">{title}</h3>
        <p className="text-xs text-gray-500 truncate">{artist}</p>
      </div>
      <div className="text-xs text-gray-400 w-24 truncate">{date}</div>
      <div className="text-xs text-gray-400 w-48 truncate hidden md:block">{album}</div>
      <div className="text-xs text-gray-500 w-12 text-right">{duration}</div>
    </div>
  );
};

export default TrendingSongRow;
