"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ResearchCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export const ResearchCard = ({ title, description, icon, link }: ResearchCardProps) => {
  return (
    <Link href={link} className="no-underline">
      <motion.div 
        className="relative bg-gray-800/50 backdrop-blur-xs border border-gray-700/50 rounded-xl p-6 h-full transition-all duration-300 cursor-pointer group overflow-hidden"
        whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.5)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Background gradient that appears on hover */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-cyan-500/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-xl border border-blue-500/0 group-hover:border-blue-500/30 group-hover:shadow-[inset_0px_0px_20px_rgba(59,130,246,0.2)] transition-all duration-500"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <div className="text-4xl mr-4 group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
              {title}
            </h3>
          </div>
          <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
            {description}
          </p>
          <div className="mt-4 flex items-center text-blue-400 font-medium">
            <span className="group-hover:text-blue-300 transition-colors duration-300">
              Learn more
            </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}; 