import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = ['About', 'Projects', 'Services', 'Contact'];

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 px-6 py-4 transition-all duration-300 ${isScrolled ? 'bg-secondary/90 backdrop-blur-md' : 'bg-transparent'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.a
            href="/"
            className={`text-2xl font-mono font-bold ${isMenuOpen && !isScrolled
                ? "text-black"
                : isScrolled
                  ? "text-primary"
                  : "text-secondary"
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-accent">{'<'}</span>
            Developer
            <span className="text-accent">{'/>'}</span>
          </motion.a>
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`transition-colors ${isScrolled ? " text-primary" : " text-secondary"} hover:text-accent`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <motion.button
            className={`text-2xl font-mono font-bold ${isMenuOpen && !isScrolled
              ? "text-black"
              : isScrolled
                ? "text-primary"
                : "text-secondary"
            }`}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? '✕' : '☰'}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-secondary z-40 pt-24 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center space-y-6 p-8">
              {menuItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-primary text-xl font-medium hover:text-accent"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;