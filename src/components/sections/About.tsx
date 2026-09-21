'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });
  const [activeTab, setActiveTab] = useState<'bio' | 'specs'>('bio');

  const textToType = `Detail-oriented Computer Science undergraduate with a robust foundation in software development, data structures, and web technologies. Experienced in building full-stack, data-driven applications through rigorous academic and enterprise internship projects. Demonstrates strong analytical thinking, disciplined problem solving, and end-to-end execution.`;

  return (
    <section id="about" className="py-16 md:py-20 relative w-full z-10" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12 flex items-baseline gap-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-oswald text-white tracking-wide">
            ABOUT & INSPECTION
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Cybernetic Terminal Window */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-[#090909]/95 border border-white/10 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            {/* Terminal Header */}
            <div className="bg-white/[0.03] px-4 py-3 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-xs text-gray-500 ml-2">sys_diagnostics.sh</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-black/40 p-0.5 rounded border border-white/5">
                <button
                  onClick={() => setActiveTab('bio')}
                  className={`px-3 py-1 rounded text-[11px] font-mono transition-colors ${
                    activeTab === 'bio' ? 'bg-[#c40024] text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  BIO
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`px-3 py-1 rounded text-[11px] font-mono transition-colors ${
                    activeTab === 'specs' ? 'bg-[#c40024] text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  SYSTEM_SPEC
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm leading-relaxed min-h-[260px]">
              {activeTab === 'bio' ? (
                <>
                  <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
                    <span className="text-green-400">sohan@cyberdeck</span>
                    <span className="text-gray-600">:</span>
                    <span className="text-blue-400">~/profile</span>
                    <span>$ cat summary.md</span>
                  </div>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-gray-300 leading-relaxed text-sm md:text-base font-space mb-6"
                  >
                    {textToType}
                  </motion.p>
                  
                  <div className="flex items-center gap-2 text-xs text-[#c40024]">
                    <span className="animate-pulse">▶</span>
                    <span>EXECUTION READY // OPEN FOR SOFTWARE ENGINEERING ROLES</span>
                  </div>
                </>
              ) : (
                <div className="space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 border-b border-white/5 gap-1 sm:gap-4">
                    <span className="text-gray-500 shrink-0">PRIMARY ROLE:</span>
                    <span className="text-white font-bold sm:text-right">Full-Stack Software Developer</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 border-b border-white/5 gap-1 sm:gap-4">
                    <span className="text-gray-500 shrink-0">CORE ARCHITECTURE:</span>
                    <span className="text-white sm:text-right">Java EE (Servlets, JDBC) + React 18</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 border-b border-white/5 gap-1 sm:gap-4">
                    <span className="text-gray-500 shrink-0">DATABASE ENGINE:</span>
                    <span className="text-white sm:text-right">MySQL / Relational Schema & Optimization</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 border-b border-white/5 gap-1 sm:gap-4">
                    <span className="text-gray-500 shrink-0">ACADEMIC METRICS:</span>
                    <span className="text-[#c40024] font-bold sm:text-right">B.E. 7.75 CGPA | Diploma 9.55 CGPA</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 border-b border-white/5 gap-1 sm:gap-4">
                    <span className="text-gray-500 shrink-0">LOCATION BASE:</span>
                    <span className="text-white sm:text-right">Bengaluru / Hassan, Karnataka, India</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4">
                    <span className="text-gray-500 shrink-0">SYSTEM STATUS:</span>
                    <span className="text-green-400 flex items-center gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      AVAILABLE FOR HIRE
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Highlights & Strengths */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 flex flex-col justify-between h-full space-y-6"
          >
            <div>
              <span className="text-xs font-mono text-[#c40024] font-bold uppercase tracking-widest block mb-2">
                // CORE CAPABILITIES
              </span>
              <h3 className="text-2xl md:text-3xl font-syne font-bold text-white mb-6">
                Engineered for Performance & Clean Code
              </h3>
              
              <ul className="space-y-3">
                {[
                  { name: 'Full-Stack Web Architecture', desc: 'React, Node, Servlets, and JSP' },
                  { name: 'Data Structures & Algorithms', desc: 'Analytical problem solving in Java' },
                  { name: 'Relational Database Design', desc: 'Optimized schema, JDBC, and SQL CRUD' },
                  { name: 'RESTful API Engineering', desc: 'Modular microservice & third-party endpoints' },
                  { name: 'UI/UX & Interactive Design', desc: 'Modern responsive cybernetic layouts' },
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + (idx * 0.1) }}
                    className="p-3 bg-white/[0.02] border border-white/5 rounded-lg hover:border-[#c40024]/40 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#c40024] rounded-sm group-hover:shadow-[0_0_8px_#c40024] transition-shadow" />
                      <span className="text-white font-mono text-sm font-medium">{item.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-space ml-3.5 mt-0.5">{item.desc}</p>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-gray-300">
                BE CSE (2026)
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-gray-300">
                Tap Academy Intern
              </span>
              <span className="px-3 py-1 rounded-full border border-red-500/30 bg-red-950/20 text-xs font-mono text-[#e0002a]">
                High Honor Graduate
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
