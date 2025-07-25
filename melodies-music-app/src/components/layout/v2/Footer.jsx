import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-[#533248] via-[#69425C] to-[#412C3A] pt-16 pb-8 text-white">
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="md:col-span-1">
            <h4 className="text-3xl font-bold mb-6">About</h4>
            <p className="text-white/90 leading-relaxed">
              Melodies is a website that has been created for over{' '}
              <span className="text-[#EE10B0]">5 years</span> now and it is one of the most famous
              music player websites in the world. In this website you can listen and download songs
              for free. Also if you want no limitation you can buy our{' '}
              <span className="text-[#0E9EEF]">premium passes</span>.
            </p>
          </div>

          {/* Melodi Section */}
          <div>
            <h4 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">Melodi</h4>
            <div className="space-y-3">
              <Link to="/songs" className="block text-white/90 hover:text-white transition-colors">
                Songs
              </Link>
              <Link to="/radio" className="block text-white/90 hover:text-white transition-colors">
                Radio
              </Link>
              <Link
                to="/podcast"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Podcast
              </Link>
            </div>
          </div>

          {/* Access Section */}
          <div>
            <h4 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">Access</h4>
            <div className="space-y-3">
              <Link
                to="/discover"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Explore
              </Link>
              <Link
                to="/artists"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Artists
              </Link>
              <Link
                to="/playlists"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Playlists
              </Link>
              <Link to="/albums" className="block text-white/90 hover:text-white transition-colors">
                Albums
              </Link>
              <Link
                to="/trending"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Trending
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-2xl font-bold mb-6 border-b border-white/20 pb-2">Contact</h4>
            <div className="space-y-3">
              <Link to="/about" className="block text-white/90 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/policy" className="block text-white/90 hover:text-white transition-colors">
                Policy
              </Link>
              <Link
                to="/socials"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Social Media
              </Link>
              <Link
                to="/support"
                className="block text-white/90 hover:text-white transition-colors"
              >
                Support
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex items-center justify-between pt-8 border-t border-white/20">
          <div className="text-3xl font-bold bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] bg-clip-text text-transparent">
            Melodies
          </div>
          <div className="flex space-x-4">{/* Icons can be added here if needed */}</div>
        </div>
      </div>
    </footer>
  );
}
