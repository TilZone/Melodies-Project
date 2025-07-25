import { Play } from 'lucide-react';
import SafeImage from '../../../components/common/SafeImage';

const TopChartCard = ({ song, onPlay }) => {
  if (!song) {
    return null;
  }

  const { name, artist, coverArt } = song;

  return (
    <div className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-b from-neutral-800 to-neutral-900 p-6 shadow-lg">
      <div className="flex items-center gap-6">
        <div className="h-32 w-32 flex-shrink-0">
          <SafeImage
            src={coverArt}
            alt={name || 'Song Cover'}
            className="h-full w-full rounded-md object-cover shadow-xl"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">Top Chart</p>
          <h2 className="mt-1 text-4xl font-bold text-white truncate" title={name}>
            {name}
          </h2>
          <p className="mt-2 text-lg text-gray-300">{artist.name}</p>
        </div>
      </div>
      <button
        onClick={() => onPlay(song)}
        className="absolute bottom-6 right-6 flex h-14 w-14 translate-y-4 items-center justify-center rounded-full bg-green-500 text-black opacity-0 shadow-2xl transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
        aria-label={`Play ${name}`}
      >
        <Play size={28} className="ml-1" />
      </button>
    </div>
  );
};

export default TopChartCard;
