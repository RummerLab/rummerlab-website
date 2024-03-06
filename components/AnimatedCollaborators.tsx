
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { getCoAuthors } from '@/lib/scholarly';


export async function AnimatedCollaborators() {
  const coauthors = await getCoAuthors("ynWS968AAAAJ");

  const people = coauthors.map((author: any, index: number) => ({
    id: index + 1,
    name: author.name,
    designation: author.affiliation,
    image: `https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=${author.scholar_id}&citpid=3`,
  }));
  
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
