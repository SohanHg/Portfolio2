'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const timelineData = [
  {
    id: 1,
    type: 'Work',
    title: 'Software Development Intern',
    org: 'Tap Academy, Bengaluru',
    date: 'Feb 2026 – Jul 2026',
    desc: [
      'Developed full-stack web applications using Java, Servlets, JSP, HTML, CSS, and MySQL',
      'Implemented backend logic with JDBC, CRUD operations',
      'Debugged, tested, and optimized application performance'
    ]
  },
  {
    id: 2,
    type: 'Education',
    title: 'BE in Computer Science and Engineering',
    org: 'Malnad College of Engineering',
    date: 'Jul 2023 – Jul 2026',
    desc: [
      'CGPA: 7.75',
      'Karnataka, India'
    ]
  },
  {
    id: 3,
    type: 'Education',
    title: 'Diploma in Computer Science',
    org: 'Rajeev Polytechnic',
    date: 'Jul 2021 – Jun 2023',
    desc: [
      'CGPA: 9.55 (Distinction)',
      'Karnataka, India'
    ]
  }
];

const TimelineItem = ({ item, index }: { item: any, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <motion.div 
      ref={ref}
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col md:flex-row items-center w-full my-8"
    >
      {/* Node and line */}
      <div className="absolute left-[14px] sm:left-[20px] md:left-1/2 w-[12px] h-[12px] bg-[#c40024] rounded-full transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(196,0,36,0.8)] border-2 border-[#090909]"></div>
      
      <div className={`w-full md:w-1/2 flex ${isLeft ? 'md:justify-end md:pr-16' : 'md:justify-start md:pl-16'} pl-9 sm:pl-14 md:pl-0`}>
        <div className="w-full max-w-lg bg-[#090909] border border-white/5 rounded-xl p-4 sm:p-6 hover:border-white/10 transition-colors relative group">
          {/* Connecting line md only */}
          <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-16 h-[2px] bg-white/5 group-hover:bg-[#c40024]/50 transition-colors ${isLeft ? '-right-16' : '-left-16'}`}></div>
          
          <div className="flex justify-between items-start mb-4 gap-4 flex-col sm:flex-row">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded text-xs font-mono text-gray-300 mb-3 border border-white/5">
                {item.type === 'Work' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a2 2 0 0 1-.01 3.138l-9.31 8.8a2 2 0 0 1-2.67.042l-8.52-7.69a2 2 0 0 1-.03-3.084l8.53-8.08a2 2 0 0 1 2.76.012z"/><path d="M12 22V10"/><path d="m22 13-10-9.5L2 13"/></svg>
                )}
                {item.type}
              </span>
              <h3 className="text-xl font-syne font-bold text-white">{item.title}</h3>
              <p className="text-[#c40024] font-medium text-sm mt-1">{item.org}</p>
            </div>
            <span className="shrink-0 text-xs font-mono text-gray-500 whitespace-nowrap">{item.date}</span>
          </div>
          
          <ul className="space-y-2 mb-4">
            {item.desc.map((d: string, i: number) => (
              <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                <span className="text-[#c40024] mt-1 text-xs">▸</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default function Experience() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Work Experience', 'Education'];
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredData = timelineData.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Work Experience' && item.type === 'Work') return true;
    if (filter === 'Education' && item.type === 'Education') return true;
    return false;
  });

  return (
    <section id="experience" className="py-16 md:py-20 relative z-10" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="flex items-baseline gap-4">
            <h2 className="text-3xl md:text-4xl font-bold font-oswald text-white tracking-wide">
              EXPERIENCE & EDUCATION
            </h2>
          </div>
          
          <div className="flex gap-1.5 bg-[#090909] p-1 rounded-lg border border-white/5 self-start md:self-auto overflow-x-auto max-w-full">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative px-3.5 py-1.5 rounded-md text-xs font-mono whitespace-nowrap transition-colors z-10 ${filter === f ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {filter === f && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-[#c40024] rounded-md -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="relative mt-20">
          {/* Central spine */}
          <div className="absolute left-[14px] sm:left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#c40024]/20 via-[#e0002a]/80 to-[#c40024]/20 transform -translate-x-1/2 shadow-[0_0_15px_rgba(196,0,36,0.3)]"></div>
          
          <div className="flex flex-col relative z-10">
            <AnimatePresence mode="popLayout">
              {filteredData.map((item, index) => (
                <TimelineItem key={item.id} item={item} index={index} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
