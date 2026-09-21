'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    links.forEach((link) => {
      const element = document.getElementById(link.href.substring(1));
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/30 backdrop-blur-xl border-b border-white/5 shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-12 h-16 md:h-18 flex items-center justify-between">
          <a href="#home" className="text-2xl font-black font-oswald tracking-tighter" data-magnetic>
            Sohan<span className="text-[var(--accent-red)]">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex relative items-center space-x-1">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-magnetic
                className={`relative px-3.5 py-1.5 text-xs md:text-sm font-medium transition-colors ${
                  activeSection === link.href.substring(1)
                    ? 'text-[var(--accent-red)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white/5 rounded-full z-[-1]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Button (44x44px touch target) */}
          <button
            className="md:hidden p-3 -mr-2 text-white z-50 relative min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 h-5 flex flex-col justify-between pointer-events-none">
              <span className={`block w-full h-0.5 bg-white transition-transform duration-300 origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-2 bg-[var(--accent-red)]' : ''}`} />
              <span className={`block w-full h-0.5 bg-white transition-opacity duration-200 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-full h-0.5 bg-white transition-transform duration-300 origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5 bg-[var(--accent-red)]' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center px-6"
          >
            {/* Subtle background red gradient ring */}
            <div className="absolute w-72 h-72 rounded-full bg-[#c40024]/10 filter blur-3xl pointer-events-none" />

            <div className="flex flex-col items-center space-y-6 relative z-10 w-full max-w-xs">
              {links.map((link, i) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full py-2.5 text-center text-2xl font-oswald uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                      isActive ? 'text-[var(--accent-red)] font-bold' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)] animate-pulse" />}
                    <span>{link.name}</span>
                  </motion.a>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-6 border-t border-white/10 w-full text-center"
              >
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-block px-5 py-2.5 rounded-lg border border-[#c40024]/60 text-[var(--accent-red)] font-mono text-xs tracking-widest uppercase font-bold"
                >
                  VIEW RÉSUMÉ ↗
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
