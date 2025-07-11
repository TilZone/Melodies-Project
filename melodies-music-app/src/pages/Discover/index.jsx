import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, Spin, Input } from 'antd';
import { PlayCircleFilled } from '@ant-design/icons';
import { fetchTrendingSongs, fetchNewReleases } from '../../services/api.js';
import { usePlayerStore } from '../../store/usePlayerStore.js';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;
const { Meta } = Card;

const DiscoverPage = () => {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const playSong = usePlayerStore((state) => state.playSong);

  // Fetch trending songs and new releases on mount
  useEffect(() => {
    const loadSongs = async () => {
      try {
        setLoading(true);
        const trending = await fetchTrendingSongs();
        const newReleasesData = await fetchNewReleases();
        setTrendingSongs(trending);
        setNewReleases(newReleasesData);
      } catch (error) {
        console.error('Error loading songs from API:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSongs();
  }, []);

  // Section for displaying a list of songs
  const SongListSection = ({ title, songs }) => (
    <div className="mb-8">
      <Title level={3} className="text-gray-800 dark:text-gray-200 mb-4">
        {title}
      </Title>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]}>
          {songs.map((song) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={4} key={song.id}>
              <Card
                hoverable
                className="rounded-lg shadow-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 overflow-hidden"
                cover={
                  <div className="relative group">
                    <img
                      alt={song.title}
                      src={song.coverArt}
                      className="w-full h-auto object-cover rounded-t-lg"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://placehold.co/150x150/535353/FFFFFF?text=No+Image';
                      }}
                    />
                    <div
                      className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg cursor-pointer"
                      onClick={() => playSong(song)}
                    >
                      <PlayCircleFilled className="text-white text-5xl" />
                    </div>
                  </div>
                }
              >
                <Meta
                  title={
                    <Link
                      to={`/music/${song.id}`}
                      className="text-gray-900 dark:text-gray-100 hover:text-green-500 transition-colors"
                    >
                      {song.title}
                    </Link>
                  }
                  description={
                    <Link
                      to={`/artists?id=${song.artist.id}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-green-400 transition-colors"
                    >
                      {song.artist.name}
                    </Link>
                  }
                />
                <Text className="text-gray-500 dark:text-gray-400 text-sm mt-2 block">
                  Plays: {song.playCount?.toLocaleString() || 0}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );

  return (
    <div className="p-4">
      <Title level={2} className="text-gray-900 dark:text-gray-100 mb-6">
        Discover Music
      </Title>

      {/* Search bar (not functional) */}
      <div className="mb-8">
        <Input
          prefix={<Search className="text-gray-500 dark:text-gray-400" size={20} />}
          placeholder="Search for songs, artists, albums..."
          className="w-full md:w-1/2 lg:w-1/3 rounded-full py-2 px-4 bg-gray-200 dark:bg-gray-700 border-none focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-900 dark:text-gray-100"
        />
      </div>

      <SongListSection title="Trending Songs" songs={trendingSongs} />
      <SongListSection title="New Releases" songs={newReleases} />
    </div>
  );
};

export default DiscoverPage;
