import React from 'react';
import { formatForUI, searchDates } from '../../helpers/date.helper';
import { Note as NoteType } from '../../types/types';
import { truncate as truncateText } from '../../helpers/text.helper';
import './Note.css';
import { getIcon } from '../../helpers/icon.helper';

type Props = {
  note: NoteType;
  onNoteEdit: (note: NoteType) => void;
  onNoteRemove: (id: string) => void;
  onNoteArchive: (id: string) => void;
};

export const Note = ({ note, onNoteEdit, onNoteRemove, onNoteArchive }: Props) => {
  const { id, name, created, category, content } = note;

  const handleRemove = () => {
    onNoteRemove(id);
  };

  const handleEdit = () => {
    onNoteEdit(note);
  };

  const handleArchive = () => {
    onNoteArchive(id);
  };

  const icon = getIcon(category);
  const dates = searchDates(content);
  return (
    <tr className="note">
      <td>
        <i className={icon}></i>
        {name}
      </td>
      <td>{formatForUI(created)}</td>
      <td>{category}</td>
      <td>{truncateText(content, 30)}</td>
      <td>{dates}</td>
      <td>
        <i onClick={handleEdit} className="fa-solid fa-pencil"></i>
        <i onClick={handleArchive} className="fa-solid fa-file-arrow-down"></i>
        <i onClick={handleRemove} className="fa-solid fa-trash"></i>
      </td>
    </tr>
  );
};
