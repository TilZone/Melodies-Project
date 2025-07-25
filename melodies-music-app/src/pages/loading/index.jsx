import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate('/home', { replace: true });
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(65, 44, 58, 0.9), rgba(65, 44, 58, 0.9)), url('https://api.builder.io/api/v1/image/assets/TEMP/7654549a92e83a602da80ef9e1a33cc522eae061?width=860')`,
      }}
    >
      {/* Logo */}
      <div className="mb-8">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/60fec0c508fa38cfe9e4a39518b962fd96ba0745?width=430"
          alt="Melodies Logo"
          className="w-48 h-auto animate-pulse"
        />
      </div>

      {/* Loading Section */}
      <div className="flex items-center gap-2 opacity-80">
        <span className="text-white text-lg font-bold tracking-widest">Loading</span>
        <div className="w-6 h-6 relative">
          <svg
            className="animate-spin"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 2.5C18.0228 2.5 22.5 6.97715 22.5 12.5C22.5 18.0228 18.0228 22.5 12.5 22.5C6.97715 22.5 2.5 18.0228 2.5 12.5C2.5 6.97715 6.97715 2.5 12.5 2.5Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60 20"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
