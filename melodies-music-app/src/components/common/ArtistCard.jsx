import PropTypes from 'prop-types';

const ArtistCard = ({ name, image, onClick }) => (
  <div className="flex flex-col items-center min-w-[84px] cursor-pointer group" onClick={onClick}>
    <img
      src={image}
      alt={name}
      className="w-[84px] h-[84px] rounded-full object-cover mb-2 group-hover:scale-105 transition-transform duration-300"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `https://placehold.co/84x84/1a1a1a/ffffff?text=${name.charAt(0)}`;
      }}
    />
    <span className="text-gray-900 dark:text-white text-sm font-bold text-center font-vazirmatn">
      {name}
    </span>
  </div>
);

ArtistCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ArtistCard;
