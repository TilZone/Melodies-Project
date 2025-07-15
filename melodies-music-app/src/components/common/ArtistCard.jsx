import PropTypes from 'prop-types';

const ArtistCard = ({ name, image }) => (
  <div className="flex flex-col items-center min-w-[84px] cursor-pointer hover:scale-105 transition-transform duration-300">
    <img
      src={image}
      alt={name}
      className="w-[84px] h-[84px] rounded-full object-cover mb-2"
      onError={(e) => {
        e.target.onerror = null; // prevent infinite loop
        e.target.src = `https://placehold.co/84x84/1DB954/FFFFFF?text=${name.charAt(0)}`;
      }}
    />
    <span className="text-white text-sm font-bold text-center truncate">{name}</span>
  </div>
);

ArtistCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default ArtistCard;
