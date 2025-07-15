import PropTypes from 'prop-types';

const SongCard = ({ title, artist, image }) => (
  <div className="flex flex-col min-w-[120px]">
    <div className="relative w-[120px] h-[120px] rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null; // prevent infinite loop
          e.target.src = `https://placehold.co/120x120/1DB954/FFFFFF?text=Song`;
        }}
      />
    </div>
    <div className="mt-1">
      <h3 className="text-white text-sm font-bold truncate">{title}</h3>
      <p className="text-white text-xs opacity-80 truncate">{artist}</p>
    </div>
  </div>
);

SongCard.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default SongCard;
