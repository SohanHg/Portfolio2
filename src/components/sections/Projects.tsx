'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Project {
  id: string;
  tag: string;
  name: string;
  image: string;
  description: string;
  tech: string[];
  url?: string;
  hasButton: boolean;
}

const projects: Project[] = [
  {
    id: 'travel-planner',
    tag: 'AI TRIP ORCHESTRATION',
    name: 'AI TRAVEL PLANNER',
    image: '/projects/ai-travel-planner.jpg',
    description:
      'Full-stack AI trip orchestration platform with Google Gemini API, real-time Firestore sync, dynamic budget estimation, and responsive dark cyberpunk HUD UI.',
    tech: ['REACT', 'FIREBASE', 'REST APIS', 'GEMINI API', 'TAILWIND'],
    url: 'https://travel-planner-taupe-ten.vercel.app/',
    hasButton: true
  },
  {
    id: 'food-delivery',
    tag: 'ENTERPRISE FOOD COMMERCE',
    name: 'FOOD DELIVERY WEB APPLICATION',
    image: '/projects/food-delivery-app.jpg',
    description:
      'Comprehensive enterprise food ordering platform featuring MVC architecture, session management, secure OTP authentication, and relational order tracking.',
    tech: ['JAVA', 'SERVLETS', 'JSP', 'MYSQL', 'JDBC'],
    url: 'https://fooddeliveryapp-0u5w.onrender.com/',
    hasButton: true
  },
  {
    id: 'hotel-booking',
    tag: 'HOSPITALITY MANAGEMENT',
    name: 'HOTEL BOOKING & MANAGEMENT PORTAL',
    image: '/projects/hotel-management-portal.jpg',
    description:
      'Full-stack hospitality operations portal with role-based access control (Admin & Customer), dynamic room availability engine, and automated PDF invoice generation.',
    tech: ['JAVA', 'SERVLETS', 'JSP', 'MYSQL', 'JDBC'],
    hasButton: false // Strictly NO button per user rule
  }
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Real-time 3D tilt calculation (rotateX, rotateY)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTilt({ x: rotateX, y: rotateY });
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setSpotlight(prev => ({ ...prev, opacity: 0 }));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.touches.length === 0) return;
    setIsHovered(true);
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current || e.touches.length === 0) return;
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsHovered(false);
      setTilt({ x: 0, y: 0 });
      setSpotlight(prev => ({ ...prev, opacity: 0 }));
    }, 500);
  };

  return (
    <div
      style={{ perspective: '1000px' }}
      className={`h-full flex flex-col ${
        index === 2
          ? 'md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none lg:mx-0 w-full'
          : 'w-full'
      }`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out'
        }}
        className={`relative flex-1 flex flex-col justify-between p-5 sm:p-6 rounded-xl bg-[#090909]/90 border backdrop-blur-xl transition-colors duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.7)] ${
          isHovered
            ? 'border-[#c40024]/60 shadow-[0_20px_45px_rgba(196,0,36,0.18)]'
            : 'border-white/10 hover:border-white/20'
        }`}
      >
        {/* Dynamic radial cursor spotlight tracking cursor movement inside card */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(380px circle at ${spotlight.x}px ${spotlight.y}px, rgba(196, 0, 36, 0.22), transparent 70%)`
          }}
        />

        {/* HUD Corner Brackets */}
        <div
          className={`absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 transition-colors duration-300 pointer-events-none ${
            isHovered ? 'border-[#c40024] shadow-[0_0_8px_rgba(196,0,36,0.8)]' : 'border-white/20'
          }`}
        />
        <div
          className={`absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 transition-colors duration-300 pointer-events-none ${
            isHovered ? 'border-[#c40024] shadow-[0_0_8px_rgba(196,0,36,0.8)]' : 'border-white/20'
          }`}
        />
        <div
          className={`absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 transition-colors duration-300 pointer-events-none ${
            isHovered ? 'border-[#c40024] shadow-[0_0_8px_rgba(196,0,36,0.8)]' : 'border-white/20'
          }`}
        />
        <div
          className={`absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 transition-colors duration-300 pointer-events-none ${
            isHovered ? 'border-[#c40024] shadow-[0_0_8px_rgba(196,0,36,0.8)]' : 'border-white/20'
          }`}
        />

        {/* Card Header & Content */}
        <div className="relative z-10 space-y-3" style={{ transform: 'translateZ(20px)' }}>
          {/* Tag header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
            <span className="font-mono text-[10px] tracking-widest text-gray-400 uppercase">
              {project.tag}
            </span>
          </div>

          {/* Project Screenshot / Thumbnail */}
          <div className="relative w-full h-36 sm:h-40 rounded-lg overflow-hidden border border-white/10 bg-black/40">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Subtle vignette/gradient to blend with obsidian card */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-black/20 pointer-events-none" />
          </div>

          <h3 className="text-lg sm:text-xl font-black font-oswald text-white tracking-wide uppercase leading-tight">
            {project.name}
          </h3>

          <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-3">
            {project.description}
          </p>

          {/* Technologies immediately following the description */}
          <div className="pt-2">
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase block mb-2">
              Technologies
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-white/[0.04] border border-white/5 text-gray-300 hover:border-[#c40024]/40 hover:text-white transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer: Action Button (Only for projects with live button) */}
        {project.hasButton && project.url && (
          <div className="relative z-10 pt-5 mt-auto" style={{ transform: 'translateZ(25px)' }}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-[var(--accent-red)] hover:bg-[var(--bright-red)] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(196,0,36,0.3)] hover:shadow-[0_0_20px_rgba(196,0,36,0.6)]"
            >
              <span>LIVE DEMO</span>
              <span className="text-sm">↗</span>
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-16 md:py-20 relative z-10 w-full" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12 flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold font-oswald text-white tracking-wide">
              PROJECTS
            </h2>
            <div className="hidden sm:block w-16 h-[1px] bg-gradient-to-r from-[var(--accent-red)] to-transparent opacity-50" />
          </div>
          <span className="font-mono text-xs text-gray-500 tracking-widest uppercase">
            // SELECTED WORK
          </span>
        </motion.div>

        {/* 3D Perspective Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
