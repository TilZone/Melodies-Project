import PropTypes from 'prop-types';
import { cn } from '../../lib/utils'; // Assuming cn is a utility for class names

const Skeleton = ({ className, ...props }) => {
  return <div className={cn('animate-pulse rounded-md bg-gray-800', className)} {...props} />;
};

Skeleton.propTypes = {
  className: PropTypes.string,
};

export { Skeleton };
