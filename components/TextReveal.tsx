"use client";
import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "./ui/text-reveal-card";

export function TextReveal() {
  return (
    <div className="flex items-center justify-center bg-[#0E0E10] h-[40rem] rounded-2xl w-full">
      <TextRevealCard
        text="Healthy Sharks"
        revealText="Healthy Reefs"
      >
        <TextRevealCardTitle>
        Protecting our reefs is paramount for ensuring the survival of sharks. The health of these ecosystems is intricately linked.
        </TextRevealCardTitle>
        <TextRevealCardDescription>
            Seeing the connection firsthand transforms our understanding and appreciation for marine conservation.
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>
  );
}
