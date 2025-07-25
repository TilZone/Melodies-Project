// Simple utility to conditionally join class names, similar to clsx or classnames
// If your project already has a more robust `cn` utility, you should use that instead.
const cn = (...classes) => classes.filter(Boolean).join(' ');

function Skeleton({ className, ...props }) {
  return <div className={cn('animate-pulse rounded-md bg-gray-700', className)} {...props} />;
}

export default Skeleton;
