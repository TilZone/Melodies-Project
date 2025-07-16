import PropTypes from 'prop-types';

const AuthInput = ({ type = 'text', name, value, onChange, placeholder, children }) => (
  <div className="relative">
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-5 py-4 bg-[#612C4F] rounded-2xl text-white placeholder-white/60 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#EE10B0] shadow-[0_6px_4px_-1px_#612C4F] pr-12"
      required
    />
    {children && (
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">{children}</div>
    )}
  </div>
);

AuthInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default AuthInput;
