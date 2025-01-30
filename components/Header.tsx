"use client";
import React from "react";
import { WavyHero } from "./WavyHero";
import { TextReveal } from "./TextReveal";
import Menu from "./Menu";
import Logo from "./Logo";

export default function Header() {
    return (
      <>
        <WavyHero />
        <Logo />
        <p className="mt-12 mb-12 mx-auto max-w-lg text-xl text-center">
          RummerLab, led by Dr Jodie Rummer, focuses on researching the physiological
          processes and adaptations of aquatic animals in response to environmental
          stressors. Our research aims to understand how these organisms cope with
          changing conditions and contribute to the conservation of aquatic ecosystems.
        </p>
        <TextReveal />
      </>
    );
  };