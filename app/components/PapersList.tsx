import { Publication } from "../../types";

interface PapersListProps {
  papers: Publication[];
  error: string | null;
}

const PapersList: React.FC<PapersListProps> = ({ papers = [], error }) => {

  return (
    <ul>
      {papers.map((paper, index) => (
        <li key={index}>
          <a href={paper.url} target="_blank" rel="noopener noreferrer">
            {paper.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default PapersList;
