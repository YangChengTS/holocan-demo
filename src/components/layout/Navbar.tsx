import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobe, FaUser } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/auth/AuthContext';

// Navigation links based on the uploaded menu structure
const getNavLinks = (t) => [
  { href: '/', label: t('navbar.home') },
  { href: '/exhibition', label: t('navbar.exhibition') },
  { href: '/matching', label: t('navbar.matching') },
  { href: '/contracts', label: t('navbar.contracts') },
  { href: '/logistics', label: t('navbar.logistics') },
  { href: '/finance', label: t('navbar.finance') },
  { href: '/download', label: t('navbar.downloads') },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();

  // Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  // Get navigation links with translated labels
  const navLinks = getNavLinks(t);

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    // Optional: Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-nav py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <div className="relative h-12 w-36 md:w-48 transition-all duration-300 hover:opacity-90">
            <Image 
              src="/holocanlogo-nobg.svg" 
              alt="HoloCAN Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                href={link.href} 
                key={link.href}
                className="text-text-dark hover:text-primary transition font-medium text-sm relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4 ml-4">
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage} 
              className="flex items-center space-x-2 text-text-dark hover:text-primary transition px-3 py-1 rounded-full border border-border hover:border-primary"
            >
              <FaGlobe className="text-sm" />
              <span className="text-sm">{language === 'en' ? '中文' : 'English'}</span>
            </button>

            {/* Conditional Login/Register Button or User Menu */}
            {isAuthenticated ? (
              <div className="relative group">
                <Link 
                  href="/profile" 
                  className="flex items-center space-x-2 text-text-dark hover:text-primary transition px-3 py-1 rounded-full border border-border hover:border-primary"
                >
                  <FaUser className="text-sm" />
                  <span className="text-sm">{user?.profile.displayName || user?.profile.firstName}</span>
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                  <Link 
                    href="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                  >
                    个人资料
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                  >
                    退出登录
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                className="bg-primary hover:bg-button-hover text-white rounded-md text-sm px-4 py-2 transition-all duration-300"
              >
                {t('navbar.signIn')}
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span 
            className={`block w-7 h-0.5 bg-text-primary transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1.5'
            }`}
          />
          <span 
            className={`block w-7 h-0.5 bg-text-primary transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : 'mb-1.5'
            }`}
          />
          <span 
            className={`block w-7 h-0.5 bg-text-primary transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="fixed inset-0 bg-background-light/95 flex flex-col justify-center items-center z-40 lg:hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <nav className="flex flex-col items-center space-y-6 mb-10">
                {navLinks.map((link) => (
                  <Link 
                    href={link.href} 
                    key={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg text-text-dark hover:text-primary transition font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              
              <div className="flex flex-col items-center space-y-6 mt-6">
                <button 
                  onClick={toggleLanguage} 
                  className="flex items-center space-x-2 text-text-dark hover:text-primary transition px-4 py-2 rounded-full border border-border hover:border-primary"
                >
                  <FaGlobe className="text-base" />
                  <span>{language === 'en' ? '中文' : 'English'}</span>
                </button>
                
                {/* Conditional Login/Register Button or User Menu for Mobile */}
                {isAuthenticated ? (
                  <div className="flex flex-col items-center space-y-4">
                    <Link 
                      href="/profile" 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 text-text-dark hover:text-primary transition px-4 py-2"
                    >
                      <FaUser className="text-base" />
                      <span>个人资料</span>
                    </Link>
                    <button 
                      onClick={handleLogout} 
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md px-8 py-3 transition-all duration-300"
                    >
                      退出登录
                    </button>
                  </div>
                ) : (
                  <Link 
                    href="/auth/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-primary hover:bg-button-hover text-white rounded-md px-8 py-3 transition-all duration-300"
                  >
                    {t('navbar.signIn')}
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar; 