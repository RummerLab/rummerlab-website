import React from "react";
import { getCoAuthors } from "@/lib/scholarly";
import { ClientAnimatedCollaborators } from "./ClientAnimatedCollaborators";
import { CoAuthor } from "@/types/scholarly";

export async function AnimatedCollaborators() {
  const coauthors: CoAuthor[] = await getCoAuthors("ynWS968AAAAJ");

  const people = coauthors.map((author: any, index: number) => ({
    id: index + 1,
    name: author.name,
    designation: author.affiliation,
    image: `https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=${author.scholar_id}&citpid=3`,
  }));
  
  return <ClientAnimatedCollaborators people={people} />;
}
