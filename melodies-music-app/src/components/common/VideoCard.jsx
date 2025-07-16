import PropTypes from 'prop-types';

const VideoCard = ({ title, artist, views, image, onClick }) => (
  <div className="flex flex-col min-w-[140px] cursor-pointer group" onClick={onClick}>
    <div className="relative w-[140px] h-[76px] rounded-md overflow-hidden group-hover:scale-105 transition-transform duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/140x76/1a1a1a/ffffff?text=Error`;
        }}
      />
    </div>
    <div className="mt-1 flex items-end justify-between">
      <div className="flex-1 min-w-0">
        <h4 className="text-gray-900 dark:text-white text-sm font-bold font-vazirmatn truncate">
          {title}
        </h4>
        <p className="text-gray-600 dark:text-gray-400 text-xs font-vazirmatn opacity-90 truncate">
          {artist}
        </p>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-[8px] font-vazirmatn opacity-90 ml-1">
        {views}
      </p>
    </div>
  </div>
);

VideoCard.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  views: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default VideoCard;
