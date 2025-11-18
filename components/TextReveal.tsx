"use client";
import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "./ui/text-reveal-card";

export function TextReveal() {
  return (
    <div className="flex items-center justify-center h-88 sm:h-80 rounded-2xl w-full">
      <TextRevealCard
        text="Healthy Sharks"
        revealText="Healthy Reefs"
        className="text-center w-full sm:w-160"
      >
        <TextRevealCardTitle className="text-center">
          Protecting our reefs is paramount for ensuring the survival of sharks. The health of these ecosystems is intricately linked.
        </TextRevealCardTitle>
        <TextRevealCardDescription className="text-center">
          Seeing the connection firsthand transforms our understanding and appreciation for marine conservation.
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>
  );
}
