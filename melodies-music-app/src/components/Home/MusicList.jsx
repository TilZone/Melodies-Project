// Danh sách các bài hát
// props songs
//không dùng chung
// src/components/Home/MusicList.jsx
import React from 'react';
import MusicCard from './MusicCard';

const MusicList = ({ songs }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {songs.map((song) => (
        <MusicCard key={song.id} {...song} />
      ))}
    </div>
  );
};

export default MusicList;
