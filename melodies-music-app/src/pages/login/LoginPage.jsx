import { useState } from 'react';
import { Eye, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Alert, Spin } from 'antd';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useAuthStore((state) => state.login);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(formData.email, formData.password);
      navigate('/home'); // Navigate to home on successful login
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Implement actual social login logic here later
    alert(`Logging in with ${provider} is not yet implemented.`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(65, 44, 58, 0.80) 0%, rgba(65, 44, 58, 0.80) 100%), url('https://api.builder.io/api/v1/image/assets/TEMP/7654549a92e83a602da80ef9e1a33cc522eae061?width=860')`,
        }}
      />

      {/* Top Section with Brand */}
      <div className="relative z-10">
        {/* Status Bar (from Figma, but usually handled by OS/global layout) */}
        {/* <div className="flex items-center justify-between px-6 py-4">
          <div className="text-white text-[15px] font-medium font-inter">10:00</div>
          <div className="flex items-center gap-2">
            <div className="w-[15px] h-[15px] bg-[#D9D9D9] rounded-sm"></div>
            <div className="w-[15px] h-[15px] bg-[#D9D9D9] rounded-full"></div>
            <div className="w-0 h-0 border-l-[7px] border-r-[7px] border-b-[11.25px] border-l-transparent border-r-transparent border-b-[#D9D9D9]"></div>
          </div>
        </div> */}

        {/* Top Rounded Section */}
        <div className="w-full h-screen bg-[#412C3A] rounded-b-[40px] px-6 pb-6 flex flex-col justify-center items-center">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center gap-2 pt-16 mb-12">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/3d941603692b829f96294cfd2b46d5512da2b88d?width=136"
              alt="Melodies Logo"
              className="w-16 h-auto"
            />
            <h1 className="font-vazirmatn text-2xl font-bold bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] bg-clip-text text-transparent">
              Melodies
            </h1>
          </div>

          {/* Login Form */}
          <div className="space-y-6 w-full max-w-sm">
            <h2 className="text-white font-vazirmatn text-2xl font-bold text-center mb-6">
              Login To Continue
            </h2>

            {error && (
              <Alert message="Error" description={error} type="error" showIcon className="mb-4" />
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="E-Mail"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-16 px-4 py-3 bg-[#612C4F] rounded-[20px] text-white placeholder-white/60 font-vazirmatn text-sm font-bold shadow-[-1px_6px_4px_0_#612C4F] border-0 outline-none focus:ring-0"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full h-16 px-4 py-3 bg-[#612C4F] rounded-[20px] text-white placeholder-white/60 font-vazirmatn text-sm font-bold shadow-[-1px_6px_4px_0_#612C4F] border-0 outline-none focus:ring-0 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  <Eye className="w-5 h-5 text-[#EE10B0]" strokeWidth={1.5} />
                </button>
              </div>

              {/* Forgot Password and Login Button */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => alert('Forgot password functionality is not yet implemented.')}
                  className="flex items-center gap-0 text-white font-vazirmatn text-sm font-bold"
                >
                  Forgot password
                  <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2} />
                </button>

                <button
                  type="submit"
                  className="px-8 py-1 bg-[#EE10B0] rounded text-white font-vazirmatn text-sm font-bold min-w-[100px] h-7 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? <Spin size="small" /> : 'Login'}
                </button>
              </div>
            </form>

            {/* Social Login Buttons */}
            <div className="flex gap-4 pt-8">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="flex items-center gap-3 px-4 py-2 border-2 border-white rounded-[20px] flex-1 justify-center"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_212_73)">
                    <path
                      d="M6.96721 0.657779C4.9689 1.35101 3.24556 2.66679 2.05032 4.41184C0.855082 6.1569 0.250946 8.23925 0.326651 10.353C0.402355 12.4668 1.15391 14.5006 2.47092 16.1557C3.78794 17.8108 5.60099 18.9999 7.64377 19.5484C9.2999 19.9757 11.035 19.9945 12.7 19.6031C14.2083 19.2643 15.6028 18.5396 16.7469 17.5C17.9376 16.3849 18.802 14.9663 19.2469 13.3968C19.7304 11.69 19.8164 9.89519 19.4985 8.14997H10.1985V12.0078H15.5844C15.4768 12.6231 15.2461 13.2103 14.9062 13.7344C14.5663 14.2585 14.1242 14.7086 13.6063 15.0578C12.9487 15.493 12.2073 15.7857 11.4297 15.9172C10.6499 16.0622 9.85011 16.0622 9.07033 15.9172C8.27995 15.7539 7.53227 15.4277 6.87502 14.9593C5.819 14.2118 5.02608 13.1498 4.6094 11.925C4.18579 10.6771 4.18579 9.32437 4.6094 8.07653C4.906 7.20187 5.39632 6.40549 6.04377 5.74684C6.7847 4.97926 7.72273 4.43059 8.75495 4.16102C9.78718 3.89146 10.8737 3.91142 11.8953 4.21872C12.6935 4.4636 13.4233 4.89165 14.0266 5.46872C14.6339 4.86455 15.2401 4.25882 15.8453 3.65153C16.1578 3.32497 16.4985 3.01403 16.8063 2.67965C15.8852 1.82265 14.8042 1.15575 13.625 0.717154C11.4777 -0.0625494 9.12811 -0.0835031 6.96721 0.657779Z"
                      fill="white"
                    />
                    <path
                      d="M6.96721 0.657806C9.12794 -0.08398 11.4775 -0.0635778 13.625 0.715618C14.8044 1.1572 15.8849 1.82731 16.8047 2.68749C16.4922 3.02187 16.1625 3.33437 15.8438 3.65937C15.2375 4.26458 14.6318 4.8677 14.0266 5.46874C13.4233 4.89168 12.6935 4.46362 11.8953 4.21874C10.874 3.91037 9.78755 3.88926 8.75505 4.15772C7.72256 4.42618 6.78395 4.97384 6.04221 5.74062C5.39476 6.39927 4.90444 7.19564 4.60784 8.07031L1.36877 5.56249C2.52816 3.26337 4.53557 1.50472 6.96721 0.657806Z"
                      fill="#E33629"
                    />
                    <path
                      d="M0.509419 8.04688C0.683388 7.18402 0.972428 6.34843 1.36879 5.5625L4.60786 8.07656C4.18425 9.3244 4.18425 10.6772 4.60786 11.925C3.52869 12.7583 2.449 13.5958 1.36879 14.4375C0.376842 12.463 0.0743141 10.2133 0.509419 8.04688Z"
                      fill="#F8BD00"
                    />
                    <path
                      d="M10.1984 8.14844H19.4984C19.8164 9.89366 19.7303 11.6885 19.2469 13.3953C18.8019 14.9648 17.9376 16.3834 16.7469 17.4984C15.7016 16.6828 14.6516 15.8734 13.6063 15.0578C14.1245 14.7082 14.5668 14.2576 14.9067 13.733C15.2467 13.2084 15.4771 12.6205 15.5844 12.0047H10.1984C10.1969 10.7203 10.1984 9.43437 10.1984 8.14844Z"
                      fill="#587DBD"
                    />
                    <path
                      d="M1.36719 14.4375C2.4474 13.6042 3.52708 12.7667 4.60625 11.925C5.02376 13.1504 5.81782 14.2124 6.875 14.9594C7.5343 15.4256 8.28359 15.7492 9.075 15.9094C9.85477 16.0545 10.6546 16.0545 11.4344 15.9094C12.2119 15.778 12.9533 15.4853 13.6109 15.05C14.6562 15.8657 15.7063 16.675 16.7516 17.4907C15.6076 18.5309 14.2132 19.2561 12.7047 19.5954C11.0397 19.9868 9.30457 19.968 7.64844 19.5407C6.3386 19.1909 5.11512 18.5744 4.05469 17.7297C2.93239 16.8385 2.01568 15.7156 1.36719 14.4375Z"
                      fill="#319F43"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_212_73">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-white font-vazirmatn text-sm font-normal">Google Login</span>
              </button>

              <button
                onClick={() => handleSocialLogin('Facebook')}
                className="flex items-center gap-3 px-4 py-2 border-2 border-white rounded-[20px] flex-1 justify-center"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_212_68)">
                    <path
                      d="M20 10C20 4.47719 15.5228 0 10 0C4.47719 0 0 4.47719 0 10C0 14.9912 3.65687 19.1284 8.4375 19.8785V12.8906H5.89844V10H8.4375V7.79687C8.4375 5.29062 9.93047 3.90625 12.2147 3.90625C13.3088 3.90625 14.4531 4.10156 14.4531 4.10156V6.5625H13.1922C11.9499 6.5625 11.5625 7.33336 11.5625 8.12422V10H14.3359L13.8926 12.8906H11.5625V19.8785C16.3431 19.1284 20 14.9913 20 10Z"
                      fill="#1877F2"
                    />
                    <path
                      d="M13.8926 12.8906L14.3359 10H11.5625V8.12422C11.5625 7.33328 11.9499 6.5625 13.1922 6.5625H14.4531V4.10156C14.4531 4.10156 13.3088 3.90625 12.2146 3.90625C9.93047 3.90625 8.4375 5.29063 8.4375 7.79688V10H5.89844V12.8906H8.4375V19.8785C8.95439 19.9595 9.4768 20.0001 10 20C10.5232 20.0002 11.0456 19.9595 11.5625 19.8785V12.8906H13.8926Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_212_68">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-white font-vazirmatn text-sm font-normal">
                  Facebook Login
                </span>
              </button>
            </div>

            {/* Sign Up Section */}
            <div className="flex items-center justify-between pt-8">
              <div className="flex flex-col">
                <span className="text-white font-vazirmatn text-xl font-bold">
                  Dont Have An Account
                </span>
                <span className="text-white font-vazirmatn text-base font-medium">
                  Sign Up Here
                </span>
              </div>
              <Link
                to="/signup"
                className="px-6 py-1 bg-[#0E9EEF] rounded text-white font-vazirmatn text-sm font-bold min-w-[100px] h-7 flex items-center justify-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
