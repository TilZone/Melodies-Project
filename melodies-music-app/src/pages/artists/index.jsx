import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Spin } from 'antd';
import { fetchArtists } from '../../services/artist.service';
import ArtistCard from '../../components/common/ArtistCard';

const ArtistListPage = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArtists = async () => {
      try {
        setLoading(true);
        const response = await fetchArtists();
        if (response.success) {
          setArtists(response.data.data.items);
        } else {
          throw new Error(response.message || 'Failed to fetch artists');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArtists();
  }, []);

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

  return (
    <div className="px-4 lg:px-6 py-4">
      <h1 className="text-3xl font-bold text-white mb-6">All Artists</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {artists.map((artist) => (
          <Link to={`/artists/${artist._id}`} key={artist._id}>
            <ArtistCard item={artist} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtistListPage;
