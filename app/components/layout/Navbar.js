'use client';
import { useEffect, useState } from 'react';
import '../../lib/i18n';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';

// Mock Input component based on the design
const Input = ({ placeholder, className, icon, iconPosition }) => {
  return (
    <div
      className="relative hidden md:block"
      style={{
        position: 'absolute',
        left: '19.44%',
        right: '62.85%',
        top: '25.74%',
        bottom: '24.75%',
        background: 'rgba(57, 138, 200, 0.1)',
        borderRadius: '40px'
      }}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-full px-12 border-0 outline-none bg-transparent"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '15px',
          lineHeight: '18px',
          color: '#BDBDBD'
        }}
      />
      {icon === 'search' && iconPosition === 'left' && (
        <svg
          className="absolute w-[20px] h-[20px]"
          style={{
            position: 'absolute',
            left: '7.18%',
            right: '59.43%',
            top: '33.59%',
            bottom: '39.6%',
            color: '#BDBDBD'
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <g style={{
            position: 'absolute',
            left: '2.15%',
            right: '2.15%',
            top: '2.15%',
            bottom: '2.15%'
          }}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              style={{
                position: 'absolute',
                left: '2.15%',
                right: '2.15%',
                top: '2.15%',
                bottom: '2.15%',
                background: '#BDBDBD'
              }}
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
      <div className="w-full h-full relative px-4 sm:px-6 lg:px-8">
        {/* Left Section - Logo and Brand */}
        <a href="/dashboard" className="absolute left-4 sm:left-6 lg:left-8 top-0 flex items-center space-x-2 sm:space-x-3 h-full cursor-pointer select-none" style={{ textDecoration: 'none' }}>
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
        <Input
          placeholder={t('searchPlaceholder')}
          icon="search"
          iconPosition="left"
        />

        {/* Right Section - Navigation Links (Desktop) */}
        <div className="absolute right-4 sm:right-6 lg:right-8 top-0 h-full hidden lg:flex items-center space-x-4 xl:space-x-8">
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

        {/* Tablet Navigation (md screens) */}
        <div className="absolute right-4 sm:right-6 top-0 h-full hidden md:flex lg:hidden items-center space-x-4">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={`/${link.key}`}
              className="transition-colors hover:text-[#398AC8] text-sm whitespace-nowrap"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                color: '#333333',
                textDecoration: 'none'
              }}
            >
              {link.label}
            </a>
          ))}
          <button
            className="text-[#103358] hover:text-[#398AC8] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2">
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
                    color: '#BDBDBD'
                  }}
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
