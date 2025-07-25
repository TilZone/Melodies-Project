import { Link } from 'react-router-dom';
import TopChartCard from './TopChartCard';
import NewReleaseList from './NewReleaseList';
import ArtistCard from '../../../components/common/ArtistCard';
import VideoCard from '../../../components/common/VideoCard';
import SectionHeader from '../../../components/common/SectionHeader';
import { usePlayerStore } from '../../../store/usePlayerStore';

const DesktopDiscover = ({ newSongs, popularArtists, musicVideos }) => {
  const setSong = usePlayerStore((state) => state.setSong);

  const topChartSong = newSongs?.[0];
  const newReleaseSongs = newSongs?.slice(0, 5); // Get top 5 for the list

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
      {/* Main Content (2/3 width) */}
      <div className="lg:col-span-2">
        {topChartSong && <TopChartCard song={topChartSong} onPlay={setSong} />}
        <NewReleaseList songs={newReleaseSongs} onPlay={setSong} />
      </div>

      {/* Sidebar (1/3 width) */}
      <div className="lg:col-span-1">
        <section>
          <SectionHeader title="Popular" highlight="Artists" />
          <div className="mt-4 flex flex-col space-y-4">
            {popularArtists.slice(0, 4).map((artist) => (
              <Link to={`/artists/${artist._id}`} key={artist._id}>
                <ArtistCard artist={artist} layout="list" />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <SectionHeader title="Popular" highlight="Music Video" />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {musicVideos.slice(0, 2).map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesktopDiscover;
