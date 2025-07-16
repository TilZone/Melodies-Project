import PropTypes from 'prop-types';

const SongCard = ({ title, artist, image, onClick }) => (
  <div className="flex flex-col min-w-[120px] cursor-pointer group" onClick={onClick}>
    <div className="relative w-[120px] h-[120px] rounded-md overflow-hidden group-hover:scale-105 transition-transform duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/120x120/1a1a1a/ffffff?text=Error`;
        }}
      />
    </div>
    <div className="mt-1">
      <h3 className="text-gray-900 dark:text-white text-sm font-bold font-vazirmatn truncate">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-xs font-vazirmatn opacity-80 truncate">
        {artist}
      </p>
    </div>
  </div>
);

SongCard.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default SongCard;
