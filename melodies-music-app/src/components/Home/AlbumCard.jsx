// src/components/Home/AlbumCard.jsx
import React from 'react';

const AlbumCard = ({ img, title, artist }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition duration-300 overflow-hidden">
      <img src={img} alt={title} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="text-sm font-medium truncate">{title}</h3>
        <p className="text-xs text-gray-500 truncate">{artist}</p>
      </div>
    </div>
  );
};

export default AlbumCard;