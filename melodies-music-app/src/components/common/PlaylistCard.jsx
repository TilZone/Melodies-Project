const PlaylistCard = ({ title, image }) => (
  <div className="flex flex-col min-w-[120px]">
    <div className="relative w-[120px] h-[120px] rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <h3 className="text-white text-sm font-bold font-vazirmatn mt-2">{title}</h3>
  </div>
);

export default PlaylistCard;
