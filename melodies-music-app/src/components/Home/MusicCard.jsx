// Home\Thẻ hiển thị bài hát
// Props đề xuất
// title, artist, img, duration, onPlay
// component dùng chung

// src/components/Home/MusicCard.jsx
import React from 'react';

const MusicCard = ({ title, artist, img, duration, onPlay }) => {
  return (
    <div className="w-48 bg-white rounded-xl shadow p-3 cursor-pointer hover:shadow-lg transition-all">
      <img src={img} alt={title} className="w-full h-48 object-cover rounded-md mb-2" />
      <h3 className="text-sm font-semibold truncate">{title}</h3>
      <div className="text-xs text-gray-500 flex justify-between items-center">
        <span>{artist}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
};

export default MusicCard;
