"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { cn } from "@/utils/cn";

// Generate star data outside component to avoid calling Math.random during render
const generateStarData = () => {
  return [...Array(140)].map(() => {
    const baseTop = Math.random() * 100;
    const baseLeft = Math.random() * 100;
    const moveX = Math.random() * 4 - 2;
    const moveY = Math.random() * 4 - 2;
    const opacity = Math.random();
    const duration = Math.random() * 10 + 20;
    return { baseTop, baseLeft, moveX, moveY, opacity, duration };
  });
};

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Use setTimeout to avoid calling setState synchronously within effect
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isMounted && cardRef.current) {
      const { left, width: localWidth } = cardRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(localWidth);
    }
  }, [isMounted]);

  function mouseMoveHandler(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();

    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }

  function mouseEnterHandler() {
    setIsMouseOver(true);
  }

  const rotateDeg = (widthPercentage - 50) * 0.1;

  if (!isMounted) {
    return (
      <div className={cn(
        "bg-[#1d1c20] dark:bg-gray-900 border border-white/8 w-full sm:w-160 rounded-lg p-4 sm:p-8 relative overflow-hidden",
        className
      )}>
        {children}
        <div className="h-40 relative flex items-center overflow-hidden">
          <div className="overflow-hidden relative left-1/2 -translate-x-1/2">
            <p className="text-xl sm:text-2xl md:text-[3rem] py-10 font-bold bg-clip-text text-transparent bg-[#323238] dark:bg-gray-700">
              {text}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      ref={cardRef}
      className={cn(
        "bg-[#1d1c20] dark:bg-gray-900 border border-white/8 w-full sm:w-160 rounded-lg p-4 sm:p-8 relative overflow-hidden",
        className
      )}
    >
      {children}

      <div className="h-40 relative flex items-center overflow-hidden">
        <motion.div
          style={{
            width: "100%",
          }}
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
              : {
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute bg-[#1d1c20] dark:bg-gray-900 z-20 will-change-transform"
        >
          <p
            style={{
              textShadow: "4px 4px 15px rgba(0,0,0,0.5)",
            }}
            className="text-xl sm:text-2xl md:text-[3rem] py-10 font-bold text-white dark:text-gray-100 bg-clip-text text-transparent bg-linear-to-b from-white to-neutral-300"
          >
            {revealText}
          </p>
        </motion.div>
        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="h-40 w-[8px] bg-linear-to-b from-transparent via-neutral-800 to-transparent absolute z-50 will-change-transform"
        ></motion.div>

        <div className="overflow-hidden mask-[linear-gradient(to_bottom,transparent,white,transparent)] relative left-1/2 -translate-x-1/2">
          <p className="text-xl sm:text-2xl md:text-[3rem] py-10 font-bold bg-clip-text text-transparent bg-[#323238] dark:bg-gray-700">
            {text}
          </p>
          <MemoizedStars />
        </div>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={twMerge("text-white dark:text-gray-100 text-base sm:text-lg md:text-xl mb-2", className)}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={twMerge("text-[#a9a9a9] dark:text-gray-300 text-sm sm:text-base", className)}>{children}</p>
  );
};

const Stars = () => {
  // Use lazy initializer to generate star data only once, outside of render
  const starData = useState(() => generateStarData())[0];

  return (
    <div className="absolute inset-0">
      {starData.map((star, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            x: [0, star.moveX * 20, star.moveX * 40, 0],
            y: [0, star.moveY * 20, star.moveY * 40, 0],
            opacity: [star.opacity, star.opacity * 0.5, star.opacity, star.opacity],
            scale: [1, 1.2, 1, 0.8, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${star.baseTop}%`,
            left: `${star.baseLeft}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        ></motion.span>
      ))}
    </div>
  );
};

export const MemoizedStars = memo(Stars);
