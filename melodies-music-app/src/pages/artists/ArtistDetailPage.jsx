import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Spin, Card, Col, Row, Avatar, Button, Alert } from 'antd';
import { UserOutlined, PlayCircleFilled } from '@ant-design/icons';
import { fetchArtistById } from '../../services/api.js';
import { usePlayerStore } from '../../store/usePlayerStore.js';

const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;

const ArtistPage = () => {
  const { id: artistId } = useParams(); // Lấy artistId từ URL param /artist/:id
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const playSong = usePlayerStore((state) => state.playSong);

  // Gọi API lấy thông tin nghệ sĩ khi artistId thay đổi
  useEffect(() => {
    const loadArtist = async () => {
      if (artistId) {
        setLoading(true);
        setError(null);
        try {
          const fetchedArtist = await fetchArtistById(artistId);
          setArtist(fetchedArtist || null);
        } catch (err) {
          setError(err.message || 'Lỗi khi tải thông tin nghệ sĩ.');
          setArtist(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setArtist(null);
      }
    };
    loadArtist();
  }, [artistId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <Alert message={error} type="error" showIcon className="mb-4" />
        <Link to="/discover" className="text-green-500 hover:underline">
          Quay lại Discover
        </Link>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="text-center p-8">
        <Title level={3} className="text-gray-800 dark:text-gray-200">
          Không tìm thấy nghệ sĩ.
        </Title>
        <Link to="/discover" className="text-green-500 hover:underline">
          Quay lại Discover
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Thông tin nghệ sĩ */}
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <Avatar
          size={{ xs: 80, sm: 100, md: 120, lg: 160, xl: 200 }}
          src={artist.imageUrl}
          icon={<UserOutlined />}
          className="mb-4 md:mb-0 md:mr-6 rounded-full border-4 border-green-500 shadow-lg"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/200x200/535353/FFFFFF?text=Artist';
          }}
        />
        <div className="text-center md:text-left">
          <Title level={2} className="text-gray-900 dark:text-gray-100 mb-2">
            {artist.name}
          </Title>
          <Paragraph className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
            {artist.bio}
          </Paragraph>
          <Button
            type="primary"
            size="large"
            className="mt-4 rounded-full bg-green-500 hover:bg-green-600 border-none"
          >
            Follow
          </Button>
        </div>
      </div>

      {/* Top songs section */}
      {artist.topSongs && artist.topSongs.length > 0 && (
        <div className="mb-8">
          <Title level={3} className="text-gray-800 dark:text-gray-200 mb-4">
            Top Songs
          </Title>
          <Row gutter={[16, 16]}>
            {artist.topSongs.map((song) => (
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
                      <Text className="text-gray-600 dark:text-gray-400">{artist.name}</Text>
                    }
                  />
                  <Text className="text-gray-500 dark:text-gray-400 text-sm mt-2 block">
                    Plays: {song.playCount?.toLocaleString() || 0}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* Albums section */}
      {artist.albums && artist.albums.length > 0 && (
        <div className="mb-8">
          <Title level={3} className="text-gray-800 dark:text-gray-200 mb-4">
            Albums
          </Title>
          <Row gutter={[16, 16]}>
            {artist.albums.map((album) => (
              <Col xs={24} sm={12} md={8} lg={6} xl={4} key={album.id}>
                <Card
                  hoverable
                  className="rounded-lg shadow-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 overflow-hidden"
                  cover={
                    <img
                      alt={album.title}
                      src={album.coverArt}
                      className="w-full h-auto object-cover rounded-t-lg"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://placehold.co/150x150/535353/FFFFFF?text=No+Image';
                      }}
                    />
                  }
                >
                  <Meta
                    title={<Text className="text-gray-900 dark:text-gray-100">{album.title}</Text>}
                    description={
                      <Text className="text-gray-600 dark:text-gray-400">{album.releaseYear}</Text>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default ArtistPage;
