import { useAppSelector } from '../../app/hooks';
import { getSummaryData } from '../../helpers/summary.helper';
import { Note as NoteType } from '../../types/types';
import './NoteSummary.css';

type Props = {
  archiveNotes: NoteType[];
  activeNotes: NoteType[];
  showArchiveNotes: (category: string) => void;
};
export const NoteSummary = ({ archiveNotes, activeNotes, showArchiveNotes }: Props) => {
  const categories = useAppSelector((state) => state.notes.categories);
  const summaryArchive = getSummaryData(archiveNotes, categories);
  const summaryActive = getSummaryData(activeNotes, categories);

  const handleShowArchiveNotes = (category: string) => {
    showArchiveNotes(category);
  };

  const renderedArchive = Object.entries(summaryArchive).map(([category, value]: any, index) => {
    const activeValue = summaryActive[category] ?? 0;
    return (
      <tr
        key={index}
        onClick={() => {
          handleShowArchiveNotes(category);
        }}
      >
        <td>{category}</td>
        <td>{activeValue}</td>
        <td>{value}</td>
      </tr>
    );
  });
  return (
    <table className="posts-list">
      <thead>
        <tr>
          <th>Note Category</th>
          <th>Active</th>
          <th>Archived</th>
        </tr>
      </thead>
      <tbody>{renderedArchive}</tbody>
    </table>
  );
};
