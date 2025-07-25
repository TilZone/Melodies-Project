import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Section = ({ title, highlight, link, children }) => {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">
          {title} {highlight && <span className="text-[#EE10B0]">{highlight}</span>}
        </h2>
        {link && (
          <Link to={link} className="flex items-center text-[#0E9EEF] hover:underline">
            <span className="text-sm mr-1">Xem tất cả</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </Link>
        )}
      </div>
      {children}
    </section>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  highlight: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Section;
