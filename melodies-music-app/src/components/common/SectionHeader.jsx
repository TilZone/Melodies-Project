import PropTypes from 'prop-types';
import { RightOutlined } from '@ant-design/icons';

const SectionHeader = ({ title, highlight, onViewAll }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl sm:text-2xl font-bold font-vazirmatn">
      <span className="text-gray-900 dark:text-white">{title} </span>
      <span className="text-[#EE10B0]">{highlight}</span>
    </h2>
    {onViewAll && (
      <div className="flex items-center gap-1 cursor-pointer group" onClick={onViewAll}>
        <span className="text-[#0E9EEF] text-sm font-vazirmatn group-hover:opacity-80 transition-opacity">
          View All
        </span>
        <RightOutlined className="text-[#0E9EEF] text-xs group-hover:opacity-80 transition-opacity" />
      </div>
    )}
  </div>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  highlight: PropTypes.string.isRequired,
  onViewAll: PropTypes.func,
};

export default SectionHeader;
