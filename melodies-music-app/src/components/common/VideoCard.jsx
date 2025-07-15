const VideoCard = ({ title, artist, views, image }) => (
  <div className="flex flex-col min-w-[140px] cursor-pointer hover:scale-105 transition-transform duration-300">
    <div className="relative w-[140px] h-[76px] rounded-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="mt-1 flex items-end justify-between">
      <div className="flex-1 min-w-0">
        <h4 className="text-white text-sm font-bold font-vazirmatn truncate">{title}</h4>
        <p className="text-white text-xs font-vazirmatn opacity-90 truncate">{artist}</p>
      </div>
      <p className="text-white text-[8px] font-vazirmatn opacity-90 ml-1">{views}</p>
    </div>
  </div>
);

export default VideoCard;
