import PropTypes from 'prop-types';

const SocialButton = ({ provider, children, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center gap-3 px-4 py-3 rounded-2xl border-2 border-white text-white text-sm font-normal hover:bg-white/10 transition-colors min-w-[155px]"
  >
    {children}
    {provider} Login
  </button>
);

SocialButton.propTypes = {
  provider: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default SocialButton;
