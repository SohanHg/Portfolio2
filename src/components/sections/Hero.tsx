'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="home" className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden w-full py-16 lg:py-0">
      {/* Background Watermark - Sits below the neck level, styled exactly like reference image */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none w-full">
        <h1 
          className="text-[clamp(7rem,19vw,23vw)] font-oswald font-black select-none tracking-[0.1em] sm:tracking-[0.13em] md:tracking-[0.16em] opacity-40 whitespace-nowrap leading-none"
          style={{
            WebkitTextStroke: '1.5px rgba(224, 0, 42, 0.45)',
            color: 'transparent',
            textShadow: '0 0 25px rgba(196, 0, 36, 0.2)',
            transform: 'translateY(42%)'
          }}
        >
          SOHAN
        </h1>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 pt-20 md:pt-24">
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          {/* Eyebrow Badge */}
          <motion.div variants={itemVars} className="mb-4 flex items-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/30 text-xs tracking-[0.25em] uppercase font-mono text-gray-200 bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(196,0,36,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-red)] animate-pulse shadow-[0_0_8px_rgba(196,0,36,0.8)]" />
              FULL-STACK & AI ENGINEER
            </span>
          </motion.div>

          {/* Heading - Flowing naturally with confident editorial scale */}
          <motion.div variants={itemVars} className="mb-6 font-oswald uppercase font-black leading-[1.03] tracking-tight">
            <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] text-white">BUILDING IDEAS</div>
            <div className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem]">
              <span style={{ 
                backgroundImage: 'linear-gradient(135deg, white 0%, #ff3b5c 50%, #c40024 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>INTO EXPERIENCES</span>
              <span className="text-[var(--accent-red)]" style={{ textShadow: '0 0 20px var(--accent-red)' }}>.</span>
            </div>
          </motion.div>

          {/* Telemetry Row */}
          <motion.div variants={itemVars} className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-7 mb-8 font-mono border-t border-b border-white/10 py-4 sm:py-5 max-w-2xl">
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-500 tracking-wider text-[11px] sm:text-xs">CGPA</span>
              <span className="text-xl sm:text-2xl font-bold text-[var(--accent-red)]">7.75</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-500 tracking-wider text-[11px] sm:text-xs">PROJECTS</span>
              <span className="text-lg sm:text-xl font-bold text-white">3+</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-500 tracking-wider text-[11px] sm:text-xs">STACK</span>
              <span className="text-xs sm:text-sm text-gray-300 leading-tight">Java · JS<br/>React · MySQL</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-gray-500 tracking-wider text-[11px] sm:text-xs">STATUS</span>
              <span className="flex items-center gap-1.5 text-white text-xs sm:text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                Open to Work
              </span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVars} className="flex flex-wrap items-center gap-3.5">
            <a 
              href="#projects" 
              data-magnetic 
              className="px-6 py-3 bg-[var(--accent-red)] hover:bg-[var(--bright-red)] text-white text-xs sm:text-sm font-bold font-mono tracking-wider uppercase transition-colors shadow-[0_0_20px_rgba(196,0,36,0.3)]"
            >
              EXPLORE WORK &rarr;
            </a>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              data-magnetic 
              className="px-6 py-3 border border-white/20 hover:border-white/50 text-white text-xs sm:text-sm font-bold font-mono tracking-wider uppercase transition-colors"
            >
              VIEW RÉSUMÉ
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-[9px] font-mono tracking-[0.2em] text-gray-500 uppercase">Scroll</span>
        <motion.div 
          animate={{ y: [0, 6, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-4 h-4 border-b-2 border-r-2 border-[var(--accent-red)] rotate-45"
        />
      </motion.div>
    </section>
  );
}
