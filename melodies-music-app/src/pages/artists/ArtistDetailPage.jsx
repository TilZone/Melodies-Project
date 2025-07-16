import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Spin } from 'antd';
import { fetchArtistDetails } from '../../services/artist.service';
import { CheckCircleFilled } from '@ant-design/icons';

import SectionHeader from '../../components/common/SectionHeader';
import SongRow from '../../components/common/SongRow';
import AlbumCard from '../../components/common/AlbumCard';
import ArtistCard from '../../components/common/ArtistCard';

const ArtistDetailPage = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [topSongs, setTopSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for sections without API yet
  const relatedArtists = [
    {
      id: 'related-1',
      name: '50 Cent',
      picture_medium:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/2db5bda7f555d3eebb796e823a110bc0241591ce?width=369',
    },
    {
      id: 'related-2',
      name: 'Snoop Dogg',
      picture_medium:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/8f1eb15d7e6354d0442424b548cf6b462f8120a6?width=369',
    },
    {
      id: 'related-3',
      name: '2Pac',
      picture_medium:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/009e4a160e51ff1e85767e9daa02275b738a7569?width=369',
    },
    {
      id: 'related-4',
      name: 'JAY-Z',
      picture_medium:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/769c97939df8a84c08d5c93f8ba7bd266296df15?width=369',
    },
  ];

  useEffect(() => {
    const getArtistDetails = async () => {
      try {
        setLoading(true);
        const response = await fetchArtistDetails(artistId);
        if (response.success) {
          setArtist(response.data.artist);
          setTopSongs(response.data.topSongs || []);
          setAlbums(response.data.albums || []);
        } else {
          throw new Error(response.message || 'Failed to fetch artist details');
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getArtistDetails();
  }, [artistId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  if (!artist) {
    return <Alert message="Error" description="Artist not found." type="error" showIcon />;
  }

  return (
    <div className="text-white pb-24">
      {/* Artist Hero Section */}
      <div className="relative px-5 md:px-8 lg:px-16 mb-8">
        <div className="relative rounded-lg overflow-hidden shadow-2xl">
          <img
            src={artist.picture_xl || artist.picture_big}
            alt={artist.name}
            className="w-full object-cover rounded-lg h-[216px] md:h-[422px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-lg"></div>
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex items-end gap-2">
            <h1 className="text-white font-bold font-vazirmatn text-[32px] md:text-[96px]">
              {artist.name}
            </h1>
            <CheckCircleFilled className="text-[#0E9EEF] text-xl md:text-3xl mb-2 md:mb-8" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-8 lg:px-16 space-y-12">
        {/* Popular Songs */}
        <section>
          <SectionHeader title="Popular" highlight="Songs" />
          <div className="space-y-3">
            {topSongs.map((song, index) => (
              <SongRow key={song.id} song={song} index={index + 1} />
            ))}
          </div>
        </section>

        {/* Artist Albums */}
        <section>
          <SectionHeader title="Artist's" highlight="Albums" />
          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>

        {/* Related Artists */}
        <section className="pb-16">
          <SectionHeader title={`${artist.name} Fans`} highlight="Also Listen To" />
          <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-4">
            {relatedArtists.map((relatedArtist) => (
              <ArtistCard key={relatedArtist.id} artist={relatedArtist} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArtistDetailPage;
