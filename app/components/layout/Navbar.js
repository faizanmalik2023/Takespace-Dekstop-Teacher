'use client';
import { useEffect, useState } from 'react';
import '../../lib/i18n';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

// Responsive search input (visible on md+)
const Input = ({ placeholder, className, icon, iconPosition, onChange, value }) => {
  return (
    <div
      className="relative hidden md:block"
      style={{
        background: 'rgba(57, 138, 200, 0.1)',
        borderRadius: '40px',
        height: '40px',
        width: '100%',
        maxWidth: '420px'
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-full pl-10 pr-3 border-0 outline-none bg-transparent"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '15px',
          lineHeight: '18px',
          color: '#111111'
        }}
        onChange={onChange}
        value={value}
      />
      {icon === 'search' && iconPosition === 'left' && (
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <g>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </g>
        </svg>
      )}
    </div>
  );
};

const Navbar = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [userDisplay, setUserDisplay] = useState('');
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (raw) {
        const user = JSON.parse(raw);
        const name = [user?.first_name, user?.last_name].filter(Boolean).join(' ');
        // Only show full name or username; never show email
        setUserDisplay(name || user?.username || '');
      }
    } catch (_) {}
  }, []);

  const navLinks = [
    { key: 'learning', label: t('learning') },
    { key: 'analytics', label: t('analytics') }
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
      style={{
        background: '#FFFFFF',
        height: '100px'
      }}
    >
      <div className="w-full h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Left Section - Logo and Brand */}
        <a href="/dashboard" className="flex items-center space-x-2 sm:space-x-3 h-full cursor-pointer select-none" style={{ textDecoration: 'none' }}>
          <img 
            src="/logo.svg" 
            alt="TakeSpace Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10" 
          />

          {/* Brand Name */}
          <div
            className="text-lg sm:text-xl"
            style={{
              fontFamily: 'Objective, sans-serif',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: 'clamp(16px, 4vw, 20px)',
              lineHeight: '36px'
            }}
          >
            <span style={{ color: '#398AC8' }}>Take</span>
            <span style={{ color: '#103358' }}>Space</span>
          </div>
        </a>

        {/* Center Section - Search Bar (Hidden on mobile) */}
        <div className="flex-1 hidden md:flex justify-center">
          <Input
            placeholder={t('searchPlaceholder')}
            icon="search"
            iconPosition="left"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Right Section - Navigation Links (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={`/${link.key}`}
              className="transition-colors hover:text-[#398AC8] whitespace-nowrap"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: 'clamp(14px, 2vw, 16px)',
                lineHeight: '24px',
                color: '#333333',
                textDecoration: 'none'
              }}
            >
              {link.label}
            </a>
          ))}
          {isAuthenticated ? (
            <>
              <span className="text-sm text-[#103358] whitespace-nowrap">{userDisplay}</span>
              <button
                className="ml-2 px-3 py-2 text-sm rounded-md border border-[#103358] text-[#103358] hover:bg-[#E3F3FF]"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <a href="/login" className="px-3 py-2 text-sm rounded-md border border-[#103358] text-[#103358] hover:bg-[#E3F3FF]">Login</a>
          )}
        </div>
        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-[#103358] hover:text-[#398AC8] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="py-4 px-4 space-y-2">
            {/* Mobile Search Bar */}
            <div className="md:hidden mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  className="w-full px-10 py-3 border border-gray-200 rounded-full outline-none focus:border-[#398AC8]"
                  style={{
                    background: 'rgba(57, 138, 200, 0.1)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    color: '#111111'
                  }}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.key}
                href={`/${link.key}`}
                className="block py-3 px-2 transition-colors hover:text-[#398AC8] border-b border-gray-100 last:border-b-0"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  color: '#333333',
                  textDecoration: 'none'
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
