"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 1], [0, svgHeight]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, svgHeight * 0.8]);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </motion.div>
  );
}; 