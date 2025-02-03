"use client";
import React from "react";
import { TextReveal } from "./TextReveal";
import Menu from "./Menu";
import Logo from "./Logo";

export default function Header() {
    return (
      <>
        <div className="max-w-4xl mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] dark:[text-shadow:_0_1px_0_rgb(255_255_255_/_40%)]">
            RummerLab
          </h1>
          <p className="text-base md:text-lg mt-4 text-gray-800 dark:text-gray-300">
            RummerLab is a not-for-profit organisation
          </p>
        </div>
        <Logo />
        <p className="mt-2 mb-12 mx-auto max-w-lg text-xl text-gray-800 dark:text-gray-300 text-center">
          RummerLab, led by Dr Jodie Rummer, focuses on researching the physiological
          processes and adaptations of aquatic animals in response to environmental
          stressors. Our research aims to understand how these organisms cope with
          changing conditions and contribute to the conservation of aquatic ecosystems.
        </p>
        <TextReveal />
      </>
    );
  };