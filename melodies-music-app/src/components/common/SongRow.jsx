import PropTypes from 'prop-types';
import { HeartOutlined, MoreOutlined } from '@ant-design/icons';

const SongRow = ({ song, rank, onPlay, isDesktop }) => (
  <div
    className="flex items-center bg-gray-800/50 dark:bg-[#1E1E1E] rounded-md mb-3 p-3 lg:p-4 shadow-lg hover:bg-gray-700/60 dark:hover:bg-[#2A2A2A] transition-colors cursor-pointer"
    onClick={onPlay}
  >
    <div className="flex items-center gap-3 lg:gap-4 flex-1">
      <span className="text-gray-400 dark:text-white text-base lg:text-xl font-semibold font-vazirmatn w-4 lg:w-6">
        {rank}
      </span>
      <img
        src={song.coverArt}
        alt={song.title}
        className="w-12 h-12 lg:w-[60px] lg:h-[60px] rounded-md object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/60x60/1a1a1a/ffffff?text=Error`;
        }}
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-gray-900 dark:text-white text-base lg:text-xl font-semibold font-vazirmatn truncate">
          {song.title}
        </h4>
        <p className="text-gray-600 dark:text-white/80 text-xs lg:text-sm font-vazirmatn opacity-80 truncate">
          {song.artist.name}
        </p>
      </div>
    </div>

    {isDesktop && (
      <span className="text-gray-500 dark:text-white text-base font-vazirmatn mr-20">
        {new Date(song.releaseDate).toLocaleDateString()}
      </span>
    )}

    {isDesktop && (
      <span className="text-gray-500 dark:text-white text-base font-vazirmatn mr-16">
        {song.playCount.toLocaleString()}
      </span>
    )}

    <div className="flex items-center gap-3 lg:gap-4">
      <HeartOutlined className="text-[#EE10B0] text-lg lg:text-xl hover:scale-110 transition-transform cursor-pointer" />
      <span className="text-gray-500 dark:text-white text-sm lg:text-base font-vazirmatn">{`${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, '0')}`}</span>
      <MoreOutlined className="text-gray-400 dark:text-white text-lg lg:text-xl hover:text-[#EE10B0] transition-colors cursor-pointer" />
    </div>
  </div>
);

SongRow.propTypes = {
  song: PropTypes.object.isRequired,
  rank: PropTypes.number.isRequired,
  onPlay: PropTypes.func.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};

export default SongRow;
