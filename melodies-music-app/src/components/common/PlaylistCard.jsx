import PropTypes from 'prop-types';

const PlaylistCard = ({ title, image, onClick = () => {} }) => (
  <div
    className="flex flex-col min-w-[120px] cursor-pointer hover:scale-105 transition-transform duration-300"
    onClick={onClick}
  >
    <div className="relative w-[120px] h-[120px] rounded-md overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/120x120/1DB954/FFFFFF?text=${title.charAt(0)}`;
        }}
      />
    </div>
    <h3 className="text-white text-sm font-bold font-vazirmatn mt-2 truncate">{title}</h3>
  </div>
);

PlaylistCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default PlaylistCard;
