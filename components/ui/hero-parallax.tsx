"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

export const HeroParallax = ({
  products,
}: {
  products: Product[];
}) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Create parallax effects for each position
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div
      ref={ref}
      className="relative w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1 */}
        <div className="mb-8 md:mb-0">
          <motion.div
            style={{ y: y1 }}
            className="relative h-[400px] md:h-[500px] w-full"
          >
            <Link
              href={products[0].link}
              className="relative group h-full w-full block"
            >
              <motion.div 
                className="relative h-full w-full overflow-hidden rounded-2xl shadow-xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                transition={{ delay: 0 }}
              >
                <Image
                  src={products[0].thumbnail}
                  alt={products[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8">
                  <div className="w-full">
                    <motion.h3 
                      className="text-white text-3xl md:text-4xl font-bold text-center px-4 drop-shadow-lg mb-3 tracking-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {products[0].title}
                    </motion.h3>
                    
                    <div className="h-1 w-16 bg-blue-500 mx-auto mb-4 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                    
                    <div className="flex justify-center">
                      <span className="px-6 py-2.5 bg-black/30 backdrop-blur-sm text-white text-sm rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        Explore Project
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Card 2 */}
        <div className="mb-8 md:mb-0">
          <motion.div
            style={{ y: y2 }}
            className="relative h-[400px] md:h-[500px] w-full"
          >
            <Link
              href={products[1].link}
              className="relative group h-full w-full block"
            >
              <motion.div 
                className="relative h-full w-full overflow-hidden rounded-2xl shadow-xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                transition={{ delay: 0.15 }}
              >
                <Image
                  src={products[1].thumbnail}
                  alt={products[1].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8">
                  <div className="w-full">
                    <motion.h3 
                      className="text-white text-3xl md:text-4xl font-bold text-center px-4 drop-shadow-lg mb-3 tracking-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {products[1].title}
                    </motion.h3>
                    
                    <div className="h-1 w-16 bg-blue-500 mx-auto mb-4 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                    
                    <div className="flex justify-center">
                      <span className="px-6 py-2.5 bg-black/30 backdrop-blur-sm text-white text-sm rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        Explore Project
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Card 3 */}
        <div className="mb-8 md:mb-0">
          <motion.div
            style={{ y: y3 }}
            className="relative h-[400px] md:h-[500px] w-full"
          >
            <Link
              href={products[2].link}
              className="relative group h-full w-full block"
            >
              <motion.div 
                className="relative h-full w-full overflow-hidden rounded-2xl shadow-xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                transition={{ delay: 0.3 }}
              >
                <Image
                  src={products[2].thumbnail}
                  alt={products[2].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8">
                  <div className="w-full">
                    <motion.h3 
                      className="text-white text-3xl md:text-4xl font-bold text-center px-4 drop-shadow-lg mb-3 tracking-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      {products[2].title}
                    </motion.h3>
                    
                    <div className="h-1 w-16 bg-blue-500 mx-auto mb-4 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                    
                    <div className="flex justify-center">
                      <span className="px-6 py-2.5 bg-black/30 backdrop-blur-sm text-white text-sm rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        Explore Project
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Card 4 */}
        <div className="mb-8 md:mb-0">
          <motion.div
            style={{ y: y4 }}
            className="relative h-[400px] md:h-[500px] w-full"
          >
            <Link
              href={products[3].link}
              className="relative group h-full w-full block"
            >
              <motion.div 
                className="relative h-full w-full overflow-hidden rounded-2xl shadow-xl"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={cardVariants}
                transition={{ delay: 0.45 }}
              >
                <Image
                  src={products[3].thumbnail}
                  alt={products[3].title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-end p-8">
                  <div className="w-full">
                    <motion.h3 
                      className="text-white text-3xl md:text-4xl font-bold text-center px-4 drop-shadow-lg mb-3 tracking-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {products[3].title}
                    </motion.h3>
                    
                    <div className="h-1 w-16 bg-blue-500 mx-auto mb-4 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
                    
                    <div className="flex justify-center">
                      <span className="px-6 py-2.5 bg-black/30 backdrop-blur-sm text-white text-sm rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                        Explore Project
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}; 