import PropTypes from 'prop-types';

const AlbumCard = ({ album, onClick }) => (
  <div className="flex flex-col min-w-[169px] cursor-pointer group" onClick={onClick}>
    <div className="relative w-[169px] h-[169px] overflow-hidden rounded-lg group-hover:scale-105 transition-transform duration-300">
      <img
        src={album.coverArt}
        alt={album.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/169x169/1a1a1a/ffffff?text=Error`;
        }}
      />
    </div>
    <div className="p-4 flex-1">
      <h4 className="text-gray-900 dark:text-white text-base font-medium font-vazirmatn truncate mb-1">
        {album.title}
      </h4>
      <p className="text-gray-600 dark:text-white/80 text-xs font-vazirmatn opacity-80">
        {album.releaseYear}
      </p>
    </div>
  </div>
);

AlbumCard.propTypes = {
  album: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coverArt: PropTypes.string.isRequired,
    releaseYear: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
};

export default AlbumCard;
