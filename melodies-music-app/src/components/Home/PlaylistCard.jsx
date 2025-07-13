// src/components/Home/PlaylistCard.jsx
import React from 'react';
// import { BsMusicNoteList } from 'react-icons/bs';

const PlaylistCard = ({ img, title }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition duration-300 overflow-hidden">
      <img src={img} alt={title} className="w-full h-40 object-cover" />
      <div className="p-3 flex justify-between items-center">
        <h3 className="text-sm font-medium truncate">{title}</h3>
        {/* <BsMusicNoteList className="text-gray-500" /> */}
      </div>
    </div>
  );
};

export default PlaylistCard;
