'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    title: 'Languages',
    id: '01',
    skills: ['Java', 'JavaScript']
  },
  {
    title: 'Frontend',
    id: '02',
    skills: ['HTML', 'CSS', 'React']
  },
  {
    title: 'Backend',
    id: '03',
    skills: ['Servlets', 'JDBC', 'REST APIs']
  },
  {
    title: 'Databases',
    id: '04',
    skills: ['MySQL', 'SQL']
  },
  {
    title: 'Core CS',
    id: '05',
    skills: ['OOPS', 'DBMS', 'DSA']
  }
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  return (
    <section id="skills" className="py-16 md:py-20 relative w-full" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12 flex items-center gap-4"
        >
          <h2 className="text-3xl md:text-4xl font-oswald font-bold uppercase tracking-wide text-white">Skills</h2>
          <div className="flex-grow h-[1px] bg-gradient-to-r from-[var(--accent-red)] to-transparent opacity-50 ml-4" />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:bg-white/[0.04] transition-colors relative overflow-hidden group ${
                idx === 4 ? 'md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none lg:mx-0 w-full' : 'w-full'
              }`}
            >
              {/* Top Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent-red)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-syne font-semibold text-white group-hover:text-[var(--accent-red)] transition-colors">
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-mono text-gray-300 hover:border-[var(--accent-red)] hover:text-white active:scale-95 active:border-[var(--accent-red)] hover:shadow-[0_0_10px_rgba(196,0,36,0.3)] transition-all cursor-default select-none"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
