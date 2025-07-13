// src/components/Home/ArtistCard.jsx
import React from 'react';

const ArtistCard = ({ name, avatar }) => (
  <div className="text-center">
    <img src={avatar} alt={name} className="w-20 h-20 rounded-full mx-auto object-cover" />
    <p className="text-sm mt-2 truncate">{name}</p>
  </div>
);

export default ArtistCard;