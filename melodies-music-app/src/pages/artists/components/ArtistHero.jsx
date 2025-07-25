/**
 * ArtistHero Component
 *
 * Displays the main hero section for an artist, including their cover image
 * and name with a verified badge.
 */
import PropTypes from 'prop-types';
import { CheckCircle } from 'lucide-react';
import SafeImage from '../../../components/common/SafeImage';
import { formatNumber } from '../../../utils/formatters';

const ArtistHero = ({ artist }) => {
  // Fallback to a default value if monthlyListeners is not available
  const monthlyListeners = artist.monthlyListeners || 2000000;

  return (
    <div className="relative h-[340px] w-full text-white md:h-[400px]">
      <SafeImage
        src={artist.coverImage || artist.imageUrl}
        alt={`Cover image for ${artist.name}`}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 flex flex-col p-6 md:p-8">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-blue-400" />
          <span className="font-semibold">Verified Artist</span>
        </div>
        <h1 className="mt-2 text-5xl font-extrabold tracking-tight md:text-8xl">{artist.name}</h1>
        <div className="mt-4 flex items-center gap-8">
          <span className="text-base font-medium">
            {formatNumber(monthlyListeners)} monthly listeners
          </span>
        </div>
      </div>
    </div>
  );
};

ArtistHero.propTypes = {
  artist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    coverImage: PropTypes.string,
    monthlyListeners: PropTypes.number,
  }).isRequired,
  onPlay: PropTypes.func.isRequired,
};

export default ArtistHero;
