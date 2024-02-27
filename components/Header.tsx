"use client";
import React from "react";
import { WavyHero } from "./WavyHero";
import { TextReveal } from "./TextReveal";

export default function Header() {
    return (
      <>
        <WavyHero />
        <p>
          RummerLab, led by Dr Jodie Rummer, focuses on researching the physiological
          processes and adaptations of aquatic animals in response to environmental
          stressors. Our research aims to understand how these organisms cope with
          changing conditions and contribute to the conservation of aquatic ecosystems.
        </p>
        <TextReveal />
      </>
    );
  };