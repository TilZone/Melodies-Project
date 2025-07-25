import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ArtistCard = ({ item }) => {
  if (!item) {
    return null;
  }

  return (
    <Link to={`/artists/${item._id}`} className="block group text-center">
      <div className="relative">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover mx-auto shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 rounded-full bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="mt-4">
        <h4 className="font-bold text-white truncate" title={item.name}>
          {item.name}
        </h4>
        <p className="text-sm text-gray-400">Artist</p>
      </div>
    </Link>
  );
};

ArtistCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ArtistCard;
