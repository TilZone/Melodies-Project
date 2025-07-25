import SongRow from '../../../components/common/SongRow';

const NewReleaseList = ({ songs, onPlay }) => {
  if (!songs || songs.length === 0) {
    return <p className="text-gray-400">No new releases available.</p>;
  }

  return (
    <div className="mt-6 flex flex-col">
      <h3 className="text-2xl font-bold text-white">New Releases</h3>
      <div className="mt-4 space-y-2">
        {songs.map((song, index) => (
          <SongRow
            key={song._id}
            song={song}
            rank={index + 1}
            onPlay={() => onPlay(song, songs)}
            isDesktop={true} // Explicitly set to true for desktop view
          />
        ))}
      </div>
    </div>
  );
};

export default NewReleaseList;
