import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Alert, Spin } from 'antd';
import { Heart, MoreVertical, Play, Disc, Plus } from 'lucide-react';
import { fetchArtistById } from '../../services/artist.service';
import { usePlayerStore } from '../../store/usePlayerStore';
import { formatDuration, formatPlayCount } from '../../utils/formatters';
import Section from '../../components/common/Section'; // Using the common Section component

// --- Sub-components for Artist Detail Page ---

const ArtistHero = ({ artist }) => (
  <div className="relative">
    <div className="relative h-80 lg:h-96">
      <img src={artist.imageUrl} alt={artist.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent lg:bg-gradient-to-b lg:from-transparent lg:to-black/80"></div>
      <div className="absolute bottom-8 left-8">
        <div className="flex items-center mb-4">
          {/* Star icon from Figma export */}
          <svg className="w-6 h-6 text-[#0E9EEF] mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>
        <h1 className="text-4xl lg:text-6xl font-black mb-2">{artist.name}</h1>
      </div>
    </div>
  </div>
);

const SongRow = ({ song, rank, onPlay }) => (
  <div className="bg-[#1E1E1E] rounded-lg p-4 flex items-center justify-between hover:bg-[#2A2A2A] transition-colors">
    <div className="flex items-center space-x-4 flex-1">
      <span className="text-lg font-bold w-6">{rank}</span>
      <img src={song.coverArt} alt={song.title} className="w-12 h-12 rounded-lg object-cover" />
      <div className="flex-1">
        <h4 className="font-semibold">{song.title}</h4>
        <p className="text-gray-400 text-sm">{song.artist.name}</p>
      </div>
    </div>

    <div className="hidden lg:flex items-center space-x-16 text-sm text-gray-400">
      <span className="w-24">{new Date(song.releaseDate).toLocaleDateString()}</span>
      <span className="w-24">{formatPlayCount(song.playCount)}</span>
      <div className="flex items-center space-x-4">
        <Heart className="w-5 h-5 text-[#EE10B0]" />
        <span>{formatDuration(song.duration)}</span>
        <MoreVertical className="w-5 h-5" />
      </div>
    </div>

    {/* Mobile view */}
    <div className="lg:hidden flex items-center space-x-2">
      <span className="text-sm text-gray-400">{formatDuration(song.duration)}</span>
      <button onClick={onPlay} className="text-white">
        <Play className="w-5 h-5" />
      </button>
      <MoreVertical className="w-5 h-5 text-[#EE10B0]" />
    </div>
  </div>
);

const AlbumCard = ({ album }) => (
  <Link
    to={`/albums/${album._id}`}
    className="block group bg-[#1F1F1F] rounded-lg p-4 hover:bg-[#2A2A2A] transition-colors cursor-pointer"
  >
    <div className="relative mb-4">
      <img
        src={album.coverArt}
        alt={album.title}
        className="w-full aspect-square rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Disc className="w-4 h-4 text-[#0E9EEF]" />
      </div>
    </div>
    <h4 className="font-semibold text-sm mt-2 text-white truncate">{album.title}</h4>
    <p className="text-gray-400 text-xs">{new Date(album.releaseDate).getFullYear()}</p>
  </Link>
);

const SingleSongCard = ({ song }) => (
  <div className="bg-[#1F1F1F] rounded-lg p-4 hover:bg-[#2A2A2A] transition-colors">
    <img
      src={song.coverArt}
      alt={song.title}
      className="w-full aspect-square rounded-lg object-cover mb-3"
    />
    <h4 className="font-semibold text-sm mb-1">{song.title}</h4>
    <div className="flex items-center justify-between">
      <span className="text-gray-400 text-xs">{new Date(song.releaseDate).getFullYear()}</span>
      {/* Music icon from Figma export */}
      <svg className="w-4 h-4 text-[#EE10B0]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
      </svg>
    </div>
  </div>
);

const ArtistPlaylistCard = ({ playlist }) => (
  <div className="bg-[#1F1F1F] rounded-lg p-4 hover:bg-[#2A2A2A] transition-colors">
    <img
      src={playlist.image}
      alt={playlist.title}
      className="w-full aspect-square rounded-lg object-cover mb-3"
    />
    <div className="flex items-center justify-between">
      <h4 className="font-semibold text-sm">{playlist.title}</h4>
      {/* Music icon from Figma export */}
      <svg className="w-4 h-4 text-[#EE10B0]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
      </svg>
    </div>
  </div>
);

const RelatedArtistCard = ({ artist }) => (
  <div className="text-center">
    <img
      src={artist.imageUrl}
      alt={artist.name}
      className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover mx-auto mb-4 hover:scale-105 transition-transform cursor-pointer"
    />
    <h4 className="font-semibold">{artist.name}</h4>
  </div>
);

// --- Main Component ---

const ArtistDetailPage = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { playSong } = usePlayerStore();

  useEffect(() => {
    const loadArtistDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const artistData = await fetchArtistById(id);
        setArtist(artistData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadArtistDetails();
  }, [id]);

  const handlePlaySong = (song) => {
    // When a single song is played, the queue should start from that song within the artist's top songs
    const startIndex = artist.topSongs.findIndex((s) => s._id === song._id);
    playSong(song, artist.topSongs, startIndex !== -1 ? startIndex : 0);
  };

  const handlePlayAll = () => {
    if (artist?.topSongs?.length > 0) {
      playSong(artist.topSongs[0], artist.topSongs);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  if (!artist) {
    return <div className="p-8 text-center text-gray-500">Artist not found.</div>;
  }

  // Mock data for sections not yet connected to API
  const singleSongs = [
    {
      title: 'Lace It',
      releaseDate: '2023',
      coverArt:
        'https://api.builder.io/api/v1/image/assets/TEMP/0c1c41a9028880b3e5e882fe1154d269ed336ec1?width=240',
    },
    {
      title: 'Release',
      releaseDate: '2022',
      coverArt:
        'https://api.builder.io/api/v1/image/assets/TEMP/3e9dfdccf40ab9fc3e6522f8da9302f138c94442?width=240',
    },
    {
      title: 'From the D 2 the LBC',
      releaseDate: '2023',
      coverArt:
        'https://api.builder.io/api/v1/image/assets/TEMP/17e4a6db4e3fb916e8d7bbdf951a86a920be480a?width=240',
    },
    {
      title: '911',
      releaseDate: '2022',
      coverArt:
        'https://api.builder.io/api/v1/image/assets/TEMP/866f94ac1b0c80cb9c5d843e72a3ffbe0904dab3?width=240',
    },
    {
      title: 'Killshot',
      releaseDate: '2018',
      coverArt:
        'https://api.builder.io/api/v1/image/assets/TEMP/a16ea56b4f4cc779dcbee69e6e36e4707a42b28e?width=240',
    },
  ];

  const artistPlaylists = [
    {
      title: 'Full Collection',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/e1340cea017599032d10d2227e6e2c20ff58f2dd?width=240',
    },
    {
      title: 'Best Of Eminem',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/95fd50198dd9ff0beae04f130f6d6e9c85e3e3cf?width=240',
    },
    {
      title: 'Old Songs',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/88f69ccb3fa4feb01ec1867569f38ebb7d3c43a0?width=240',
    },
    {
      title: "Fan's Favorite",
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/e7a55d37905ec76e1967c8fbd438466609c7cdf0?width=240',
    },
    {
      title: 'New Release Songs',
      image:
        'https://api.builder.io/api/v1/image/assets/TEMP/915ddf26e56aec2f5f9acc5a4f58630a7fc36543?width=240',
    },
  ];

  const relatedArtists = [
    {
      name: '50 Cent',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/e844a5d52d1ff6a278c554875e4cbf96f142be1d?width=369',
    },
    {
      name: 'Snoop Dog',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/c5830a7eb7ee3f3f48fc49e1a798ad35223d9428?width=369',
    },
    {
      name: 'Tupac',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/346e51b55628bf89a57faa74c9fc78972befea98?width=369',
    },
    {
      name: 'Jay-Z',
      imageUrl:
        'https://api.builder.io/api/v1/image/assets/TEMP/91ae63e5e611652900c42660c45488ef4299a8b8?width=369',
    },
  ];

  return (
    <div className="text-white">
      <ArtistHero artist={artist} />

      <div className="px-4 lg:px-8 py-8 space-y-12">
        {/* Popular Songs Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold">
              Popular <span className="text-[#EE10B0]">Songs</span>
            </h2>
            <div className="hidden lg:flex items-center space-x-8 text-white/80">
              <span>Release Date</span>
              <span>Played</span>
              <span>Time</span>
            </div>
          </div>
          <div className="space-y-3">
            {artist.topSongs.slice(0, 5).map((song, index) => (
              <SongRow
                key={song._id}
                song={song}
                rank={index + 1}
                onPlay={() => handlePlaySong(song)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handlePlayAll}
              className="bg-[#EE10B0] px-6 py-2 rounded-lg text-white font-bold hover:bg-[#EE10B0]/90 transition-colors"
            >
              Show All
            </button>
          </div>
        </section>

        {/* Artist's Albums */}
        {artist.albums && artist.albums.length > 0 && (
          <Section title="Artist's" highlight="Albums" link={`/artists/${id}/albums`}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {artist.albums.map((album) => (
                <AlbumCard key={album._id} album={album} />
              ))}
              <Link
                to={`/artists/${id}/albums`}
                className="bg-[#1F1F1F] rounded-lg p-4 flex flex-col items-center justify-center hover:bg-[#2A2A2A] transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#1E1E1E] rounded-full flex items-center justify-center mb-3">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-center">View All</span>
              </Link>
            </div>
          </Section>
        )}

        {/* Single Songs */}
        <Section title="Single" highlight="Songs" link={`/artists/${id}/singles`}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {singleSongs.map((song, index) => (
              <SingleSongCard key={index} song={song} />
            ))}
            <Link
              to={`/artists/${id}/singles`}
              className="bg-[#1F1F1F] rounded-lg p-4 flex flex-col items-center justify-center hover:bg-[#2A2A2A] transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-[#1E1E1E] rounded-full flex items-center justify-center mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-center">View All</span>
            </Link>
          </div>
        </Section>

        {/* Artist's Playlists */}
        <Section title="Artist's" highlight="Playlist" link={`/artists/${id}/playlists`}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {artistPlaylists.map((playlist, index) => (
              <ArtistPlaylistCard key={index} playlist={playlist} />
            ))}
            <Link
              to={`/artists/${id}/playlists`}
              className="bg-[#1F1F1F] rounded-lg p-4 flex flex-col items-center justify-center hover:bg-[#2A2A2A] transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-[#1E1E1E] rounded-full flex items-center justify-center mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-center">View All</span>
            </Link>
          </div>
        </Section>

        {/* Eminem Fans Also Listen To */}
        <Section title="Eminem Fans" highlight="Also Listen To" link={`/artists/${id}/related`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedArtists.map((artist, index) => (
              <RelatedArtistCard key={index} artist={artist} />
            ))}
            <Link
              to={`/artists/${id}/related`}
              className="bg-[#1F1F1F] rounded-lg p-4 flex flex-col items-center justify-center hover:bg-[#2A2A2A] transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 bg-[#1E1E1E] rounded-full flex items-center justify-center mb-3">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-sm font-semibold text-center">View All</span>
            </Link>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default ArtistDetailPage;
