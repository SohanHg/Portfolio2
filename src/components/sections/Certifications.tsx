'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface VaultCategory {
  id: string;
  name: string;
  badge: string;
  metric: string;
  metricLabel: string;
  summary: string;
  verifiedItems: {
    title: string;
    detail: string;
    tag: string;
  }[];
  techStack: string[];
}

const vaultCategories: VaultCategory[] = [
  {
    id: 'academic',
    name: 'Academic Honors & Degrees',
    badge: 'ACADEMIC EXCELLENCE',
    metric: '9.55',
    metricLabel: 'DIPLOMA DISTINCTION CGPA',
    summary: 'Consistently ranked at the top percentile throughout technical education in Computer Science & Engineering.',
    verifiedItems: [
      {
        title: 'Diploma in Computer Science — CGPA 9.55 (Distinction)',
        detail: 'Rajeev Polytechnic (2021 – 2023). Outstanding academic distinction and cohort medalist across all core technical modules.',
        tag: 'DISTINCTION'
      },
      {
        title: 'B.E. in Computer Science & Engineering — CGPA 7.75',
        detail: 'Malnad College of Engineering (2023 – 2026). Specialized coursework in Distributed Systems, DBMS, Operating Systems, and OOP.',
        tag: 'FIRST CLASS'
      }
    ],
    techStack: ['Data Structures', 'DBMS Architecture', 'Operating Systems', 'OOP Principles']
  },
  {
    id: 'enterprise',
    name: 'Enterprise Java & Backend',
    badge: 'PRODUCTION READY',
    metric: '6 MOS',
    metricLabel: 'TAP ACADEMY INTERNSHIP',
    summary: 'Demonstrated competency in architecting scalable relational database backends, MVC frameworks, and robust transaction pipelines.',
    verifiedItems: [
      {
        title: 'Software Development Internship @ Tap Academy, Bengaluru',
        detail: 'Engineered full-stack Java web applications with Servlets, JSP, JDBC, and MySQL. Implemented business logic and CRUD database layers.',
        tag: 'ACCREDITED'
      },
      {
        title: 'MVC System Design & JDBC Connection Pooling',
        detail: 'Designed secure DAO patterns with transaction rollback protection, role-based customer and administrator authentication.',
        tag: 'ARCHITECTURE'
      }
    ],
    techStack: ['Java 17/21', 'Servlets', 'JSP', 'JDBC', 'MySQL 8.0', 'DAO Pattern']
  },
  {
    id: 'fullstack',
    name: 'Modern Web & AI Integration',
    badge: 'CUTTING EDGE',
    metric: '100%',
    metricLabel: 'CLOUD & API DEPLOYMENT',
    summary: 'Proficiency in modern responsive frontend engineering, Google Gemini AI integration, and real-time cloud authentication.',
    verifiedItems: [
      {
        title: 'AI Travel Planner — Gemini AI & Live Transit Tracking',
        detail: 'Engineered context-aware dynamic itinerary generator with Google Gemini API, live weather streams, and Firebase Google Auth.',
        tag: 'LIVE PRODUCTION'
      },
      {
        title: 'Food Delivery Web Platform — Email OTP & SMTP Dispatch',
        detail: 'Full-stack food commerce system with email OTP verification, coupon engines, cart management, and payment verification.',
        tag: 'LIVE DEPLOYED'
      }
    ],
    techStack: ['React 18', 'Google Gemini API', 'Firebase Auth', 'Tailwind CSS', 'REST APIs']
  }
];

export default function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState<string>('academic');

  const selectedCategory = vaultCategories.find((c) => c.id === activeTab) || vaultCategories[0];

  return (
    <section id="showcase" className="py-24 md:py-32 relative z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading — no numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-oswald text-white tracking-wide">
              ENGINEERING SHOWCASE & VAULT
            </h2>
            <p className="text-xs font-mono text-gray-400 mt-2 uppercase tracking-widest">
              PROVEN METRICS • ACADEMIC HONORS • ENTERPRISE CAPABILITIES
            </p>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="flex gap-2 bg-[#090909] p-1.5 rounded-xl border border-white/10 self-start md:self-auto overflow-x-auto max-w-full">
            {vaultCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                data-magnetic="true"
                className={`relative px-4 py-2 rounded-lg text-xs font-mono tracking-wider whitespace-nowrap transition-colors z-10 ${
                  activeTab === cat.id ? 'text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {activeTab === cat.id && (
                  <motion.div
                    layoutId="activeVaultTab"
                    className="absolute inset-0 bg-[#c40024] rounded-lg -z-10 shadow-[0_0_15px_rgba(196,0,36,0.6)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {cat.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Display Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            
            {/* Left Telemetry Column: 4 cols */}
            <div className="lg:col-span-4 bg-[#090909]/95 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group hover:border-[#c40024]/60 transition-colors">
              {/* Laser beam top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c40024] to-transparent shadow-[0_0_10px_#c40024]" />
              
              <div>
                <span className="text-xs font-mono text-[#c40024] font-bold tracking-widest uppercase block mb-3">
                  // {selectedCategory.badge}
                </span>

                <div className="my-6 p-5 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono text-gray-500 uppercase block mb-1">
                    {selectedCategory.metricLabel}
                  </span>
                  <span className="text-5xl font-black font-oswald text-white tracking-tight block">
                    {selectedCategory.metric}
                  </span>
                </div>

                <p className="text-sm font-space text-gray-300 leading-relaxed">
                  {selectedCategory.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 mt-6">
                <span className="text-[10px] font-mono text-gray-500 uppercase block mb-2">
                  VERIFIED STACK FOCUS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCategory.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white/5 border border-white/5 rounded text-[11px] font-mono text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Detailed Records Column: 8 cols */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {selectedCategory.verifiedItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#090909]/90 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl hover:border-[#c40024]/50 transition-all duration-300 group"
                  data-magnetic="true"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl font-bold font-syne text-white group-hover:text-red-100 transition-colors">
                      {item.title}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#c40024]/20 border border-[#c40024]/40 text-[#c40024] text-[11px] font-mono font-bold self-start sm:self-auto">
                      {item.tag}
                    </span>
                  </div>

                  <p className="text-sm font-space text-gray-400 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}

              {/* Status footer bar */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs font-mono text-gray-500">
                <span className="flex items-center gap-2 text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  AUTHENTICATED ACADEMIC & PROFESSIONAL CREDENTIALS
                </span>
                <span className="text-[#c40024] font-bold">2026 CANDIDATE</span>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
