// src/components/Home/VideoCard.jsx
import React from 'react';

const VideoCard = ({ img, title, artist, views }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition duration-300 overflow-hidden">
      <img src={img} alt={title} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h2 className="text-sm font-medium truncate">{title}</h2>
        <div className="flex justify-between text-xs text-gray-500">
          <p>{artist}</p>
          <span>{views}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
