import React, { useState } from 'react';
import { Modal } from '../modal/Modal';
import { Note as NoteType } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { noteUpdated } from '../../features/notes/notesSlice';
import './NoteEdit.css';
type Props = {
  note: NoteType | null;
  onClose: () => void;
};

export const NoteEdit = ({ note, onClose }: Props) => {
  const categories = useAppSelector((state) => state.notes.categories);
  const [updateNote, setUpdateNote] = useState({
    name: note?.name,
    category: note?.category,
    content: note?.content,
  });
  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setUpdateNote((values) => ({ ...values, [name]: value }));
  };

  const categoryOptions = categories.map((category) => (
    <option key={category.id} value={category.type}>
      {category.type}
    </option>
  ));

  const dispatch = useAppDispatch();

  const handleUpdateNote = (e: any) => {
    e.preventDefault();
    // console.log(updateNote);
    // console.log('work');
    const id = note?.id;
    dispatch(noteUpdated(String(id), String(updateNote.name), String(updateNote.category), String(updateNote.content)));
  };
  return (
    <Modal isOpen={Boolean(note)} onClose={onClose}>
      <section>
        <h2>Edit</h2>
        <form onSubmit={handleUpdateNote} className="edit-form">
          <div className="mb-3">
            <label htmlFor="noteName">Post Title:</label>
            <input
              className="form-control"
              type="text"
              id="noteName"
              name="name"
              placeholder="Name"
              value={updateNote.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="noteCategory">Category:</label>
            <select
              className="form-select"
              name="category"
              id="noteCategory"
              value={updateNote.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              {categoryOptions}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="noteContent">Content:</label>
            <textarea
              className="form-control"
              id="noteContent"
              name="content"
              value={updateNote.content}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Note
          </button>
        </form>
      </section>
    </Modal>
  );
};
