import AlbumCard from '../../components/common/AlbumCard';
import SectionHeader from '../../components/common/SectionHeader';

// Mock Data - Sẽ được thay thế bằng API sau này
const topAlbums = [
  {
    id: 1,
    title: 'Adele 21',
    artist: { name: 'Adele' },
    cover_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/7e9f955a8151235b845bd7cae07ffb43f122bbe3?width=360',
  },
  {
    id: 2,
    title: 'Beauty Behind the Madness',
    artist: { name: 'The Weeknd' },
    cover_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/8cb93b77c1faa2b3353dc95df7c1df2a9fc92463?width=360',
  },
  {
    id: 3,
    title: 'Scorpion',
    artist: { name: 'Drake' },
    cover_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/811512bcc2919ecbe950dcce95d9e4b0d20696f1?width=360',
  },
  {
    id: 4,
    title: "Harry's House",
    artist: { name: 'Harry Styles' },
    cover_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/f283a1cb2c771b3a2938f34a13b2934edb1566c9?width=360',
  },
  {
    id: 5,
    title: 'Born To Die',
    artist: { name: 'Lana Del Rey' },
    cover_medium:
      'https://cdn.builder.io/api/v1/image/assets/TEMP/675f184dd0d9a265b777b8c9836238b7226ce18a?width=360',
  },
  {
    id: 6,
    title: 'AM',
    artist: { name: 'Arctic Monkeys' },
    cover_medium:
      'https://e-cdns-images.dzcdn.net/images/cover/e2b36a9fda895cb2b27a1824598f7572/264x264-000000-80-0-0.jpg',
  },
  {
    id: 7,
    title: 'The Dark Side of the Moon',
    artist: { name: 'Pink Floyd' },
    cover_medium:
      'https://e-cdns-images.dzcdn.net/images/cover/b2b075446f4632446847a1c25545f28a/264x264-000000-80-0-0.jpg',
  },
];

const AlbumsPage = () => {
  return (
    <div className="text-white">
      <SectionHeader title="All" coloredText="Albums" showViewAll={false} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-16">
        {topAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
};

export default AlbumsPage;
