import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Note } from '../note/Note';
import { Note as NoteType } from '../../types/types';
import './NoteList.css';
import { NoteEdit } from '../note-edit/NoteEdit';
import { noteArchived, noteRemoved } from '../../features/notes/notesSlice';
import { NoteSummary } from '../note-summary/NoteSummary';
import { NoteForm } from '../note-form/NoteForm';

export const NoteList = () => {
  const notes = useAppSelector((state) => state.notes.noteItems);
  const dispatch = useAppDispatch();
  const [isNoteEdit, setNoteEdit] = useState<null | NoteType>(null);
  const [selectionByCategory, setSelectionByCategory] = useState<NoteType[]>([]);
  const onNoteEdit = (note: NoteType) => {
    if (Boolean(note)) {
      setNoteEdit(note);
    }
  };

  const onNoteRemove = (id: string): void => {
    dispatch(noteRemoved(id));
  };

  const onNoteArchive = (id: string): void => {
    dispatch(noteArchived(id));
    setSelectionByCategory([]);
  };

  const handleEditPopupClose = () => {
    setNoteEdit(null);
  };

  const activeNotes = notes.filter((note: NoteType) => note.isArchive === false);
  const archiveNotes = notes.filter((note: NoteType) => note.isArchive);

  const renderNote = (note: NoteType) => (
    <Note key={note.id} note={note} onNoteEdit={onNoteEdit} onNoteRemove={onNoteRemove} onNoteArchive={onNoteArchive} />
  );
  const renderedActiveNotes = activeNotes.map(renderNote);
  const renderedSelecedByCategory = selectionByCategory.map(renderNote);

  const showArchiveNotes = (category: string) => {
    const notes: NoteType[] = archiveNotes.filter((note: NoteType) => note.category === category);
    console.log('second');
    setSelectionByCategory(notes);
  };

  const isArchive = archiveNotes.length;
  const isSelectionByCategory = selectionByCategory.length;
  // todo layout component
  return (
    <>
      <table className="posts-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Category</th>
            <th>Content</th>
            <th>Dates</th>
            <th>
              <i className="fa-solid fa-file-arrow-down"></i>
              <i className="fa-solid fa-trash"></i>
            </th>
          </tr>
        </thead>
        <tbody>{renderedActiveNotes}</tbody>
      </table>
      {Boolean(isNoteEdit) && <NoteEdit note={isNoteEdit} onClose={handleEditPopupClose} />}
      <NoteForm />
      {Boolean(isArchive) && (
        <NoteSummary archiveNotes={archiveNotes} activeNotes={activeNotes} showArchiveNotes={showArchiveNotes} />
      )}
      {Boolean(isSelectionByCategory) && (
        <table className="posts-list">
          <thead>
            <tr>
              <th>Selected Category</th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderedSelecedByCategory}</tbody>
        </table>
      )}
    </>
  );
};
