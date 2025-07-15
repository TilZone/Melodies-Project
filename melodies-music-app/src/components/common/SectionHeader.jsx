import { RightOutlined } from '@ant-design/icons';

const SectionHeader = ({ title, highlight }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl sm:text-2xl font-bold font-vazirmatn">
      <span className="text-white">{title} </span>
      <span className="text-[#EE10B0]">{highlight}</span>
    </h2>
    <div className="flex items-center gap-1">
      <span className="text-[#0E9EEF] text-sm font-vazirmatn">View All</span>
      <RightOutlined className="text-[#0E9EEF] text-xs" />
    </div>
  </div>
);

export default SectionHeader;
