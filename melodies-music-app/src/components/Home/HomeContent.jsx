import React from 'react';
import SectionTitle from './SectionTitle';
import MusicCard from './MusicCard';
import TrendingSongRow from './TrendingSongRow';
import ArtistCard from './ArtistCard';
import AlbumCard from './AlbumCard';
import PlaylistCard from './PlaylistCard';
import VideoCard from './VideoCard';
import JoinSection from './JoinSection';

import topSongs from '../../data/topSongs';
import trendingSongs from '../../data/trendingSongs';
import artists from '../../data/artists';
import albums from '../../data/albums';
import playlists from '../../data/playlists';
import videos from '../../data/videos';

import TopBar from '../Layout/TopBar';

const HomeContent = () => {
  return (
    <main className="w-full px-6 py-4 overflow-y-auto">

      <TopBar />

      {/* Weekly Top Songs */}
      <SectionTitle title="WEEKLY TOP SONGS" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {topSongs.map((song, index) => (
          <MusicCard key={index} {...song} />
        ))}
      </div>

      {/* Trending Songs */}
      <SectionTitle title="TRENDING SONGS" />
      <div className="flex flex-col gap-4">
        {trendingSongs.map((song, index) => (
          <TrendingSongRow key={index} rank={index + 1} {...song} />
        ))}
      </div>

      {/* Popular Artists */}
      <SectionTitle title="POPULAR ARTISTS" />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {artists.map((artist, index) => (
          <ArtistCard key={index} {...artist} />
        ))}
      </div>

      {/* Music Videos */}
      <SectionTitle title="MUSIC VIDEO" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div>

      {/* Top Albums */}
      <SectionTitle title="TOP ALBUMS" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {albums.map((album, index) => (
          <AlbumCard key={index} {...album} />
        ))}
      </div>

      {/* Mood Playlist */}
      <SectionTitle title="MOOD PLAYLIST" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {playlists.map((playlist, index) => (
          <PlaylistCard key={index} {...playlist} />
        ))}
      </div>

      {/* Join Our Platform */}
      <JoinSection />
    </main>
  );
};

export default HomeContent;