'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [copied, setCopied] = useState(false);
  
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('sohanhg12@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
    // Form action placeholder
  };

  return (
    <section id="contact" className="py-16 md:py-20 relative z-10" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12 flex items-baseline gap-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-oswald text-white tracking-wide">
            CONTACT
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Column: Text & Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col"
          >
            <h3 className="text-2xl md:text-3xl font-syne font-bold text-white mb-4 leading-tight">
              Let's build something <span className="text-[#c40024]">amazing</span> together.
            </h3>
            <p className="text-gray-400 font-space mb-8 max-w-md leading-relaxed text-sm">
              Open for opportunities, collaborations, and discussions. Feel free to reach out through any of these channels.
            </p>
            
            <div className="space-y-4 mt-auto">
              <div className="flex items-center gap-3.5 p-3.5 bg-[#090909] border border-white/5 rounded-xl group hover:border-white/10 transition-colors">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-[#c40024] group-hover:bg-[#c40024] group-hover:text-white transition-colors shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <div className="flex-grow">
                  <p className="text-[10px] font-mono text-gray-500 mb-0.5">EMAIL</p>
                  <p className="text-white font-mono text-xs md:text-sm">sohanhg12@gmail.com</p>
                </div>
                <button 
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[11px] font-mono text-gray-300 transition-colors relative"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-[#090909] border border-white/5 rounded-xl group hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-[#c40024] group-hover:bg-[#c40024] group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-500 mb-1">PHONE</p>
                  <p className="text-white font-mono text-sm md:text-base">+91 8150952155</p>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <a 
                  href="https://github.com/SohanHg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-[#090909] border border-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all hover:-translate-y-1"
                  data-magnetic="true"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
                </a>
                <a 
                  href="https://linkedin.com/in/sohan-hg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-[#090909] border border-white/5 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all hover:-translate-y-1"
                  data-magnetic="true"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-[#090909] border border-white/5 rounded-xl p-6 sm:p-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-mono text-gray-500 mb-1.5">NAME</label>
                  <input 
                    type="text" 
                    id="name"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2.5 text-base md:text-xs text-white placeholder-gray-600 font-mono focus:outline-none focus:border-[#c40024] focus:ring-1 focus:ring-[#c40024]/50 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-mono text-gray-500 mb-1.5">EMAIL</label>
                  <input 
                    type="email" 
                    id="email"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2.5 text-base md:text-xs text-white placeholder-gray-600 font-mono focus:outline-none focus:border-[#c40024] focus:ring-1 focus:ring-[#c40024]/50 transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[10px] font-mono text-gray-500 mb-1.5">MESSAGE</label>
                  <textarea 
                    id="message"
                    rows={3}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-3.5 py-2.5 text-base md:text-xs text-white placeholder-gray-600 font-mono focus:outline-none focus:border-[#c40024] focus:ring-1 focus:ring-[#c40024]/50 transition-all resize-none"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-[#c40024] hover:bg-[#e0002a] text-white py-3 rounded-lg font-mono text-xs font-bold tracking-wider transition-colors mt-2"
                  data-magnetic="true"
                >
                  SEND MESSAGE
                </button>
              </form>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 pt-6 border-t border-white/5 text-center"
        >
          <p className="text-xs font-mono text-gray-600">
            © 2026 Sohan H G. Built with passion.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
