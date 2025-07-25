import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';

const PlaylistCard = ({ item }) => {
  if (!item) return null;

  return (
    <Link
      to={`/playlists/${item.id}`}
      className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors group cursor-pointer"
    >
      <div className="relative mb-4">
        <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-lg" />
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Music className="w-4 h-4 text-[#EE10B0]" />
        </div>
      </div>
      <h4 className="font-semibold text-white">{item.title}</h4>
    </Link>
  );
};

PlaylistCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default PlaylistCard;
