"use client";
import React from "react";
import { WavyBackground } from "./ui/wavy-background";

export function WavyHero() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-20">
      <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
        Rummerlab
      </p>
      <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
        RummerLab is a not-for-profit organisation
      </p>
    </WavyBackground>
  );
}
