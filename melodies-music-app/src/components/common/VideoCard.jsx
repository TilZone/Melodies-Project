import PropTypes from 'prop-types';
import { Play } from 'lucide-react';

const VideoCard = ({ item }) => {
  if (!item) return null;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer">
      <div className="relative">
        <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Play className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-lg mb-1 text-white">{item.title}</h4>
        <p className="text-gray-400 text-sm mb-2">{item.artist}</p>
        <p className="text-gray-400 text-xs">{item.views}</p>
      </div>
    </div>
  );
};

VideoCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    views: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default VideoCard;
