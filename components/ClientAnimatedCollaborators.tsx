"use client";

import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";

interface Person {
  id: number;
  name: string;
  designation: string;
  image: string;
}

interface Props {
  people: Person[];
}

export function ClientAnimatedCollaborators({ people }: Props) {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
} 