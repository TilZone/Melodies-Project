import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spin, Alert, Typography } from 'antd';
import { fetchArtists } from '../../services/api';
import ArtistCard from '../../components/common/ArtistCard';

const { Title } = Typography;

const ArtistListPage = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArtists = async () => {
      try {
        setLoading(true);
        const data = await fetchArtists();
        setArtists(data);
        setError(null);
      } catch (err) {
        setError('Could not fetch artists. Please try again later.');
        console.error('Error fetching artists:', err);
      } finally {
        setLoading(false);
      }
    };

    getArtists();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <Title level={2} className="text-gray-800 dark:text-gray-200 mb-6">
        All Artists
      </Title>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {artists.map((artist) => (
          <Link to={`/artists/${artist.id}`} key={artist.id}>
            <ArtistCard
              name={artist.name}
              image={artist.imageUrl}
              // Optional: Add follower count if available in your API
              // followers={artist.followers}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtistListPage;
