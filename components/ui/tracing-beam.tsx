"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
    >
      <div>
        {children}
      </div>
    </motion.div>
  );
}; 