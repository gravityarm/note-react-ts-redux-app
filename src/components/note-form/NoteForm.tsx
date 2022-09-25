import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { noteAdded } from '../../features/notes/notesSlice';



export const NoteForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const categories = useAppSelector((state) => state.notes.categories);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const onNameChanged = (e: any) => setName(e.target.value);
  const onContentChanged = (e: any) => setContent(e.target.value);
  const onCategoryChanged = (e: any) => setCategory(e.target.value);
  const dispatch = useAppDispatch();
  const onSaveNoteClicked = () => {
    if (name && category && content) {
      // dispatch(postAdded(title, content, userId));
      dispatch(noteAdded(name, category, content));
      console.log(name, category, content);
      setName('');
      setContent('');
      setIsOpen(false);
    }
  };

  const categoryOptions = categories.map((category) => (
    <option key={category.id} value={category.type}>
      {category.type}
    </option>
  ));

  const canSave = Boolean(name) && Boolean(category) && Boolean(content);
  return (
    <div>
      <button onClick={handleOpen} className="btn btn-secondary">
        Create Note
      </button>
      {isOpen && (
        <section>
          <h2>Form</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="noteName">Post Title:</label>
              <input
                className="form-control"
                type="text"
                id="noteName"
                name="noteName"
                placeholder="Name"
                value={name}
                onChange={onNameChanged}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="noteCategory">Category:</label>
              <select className="form-select" id="noteCategory" value={category} onChange={onCategoryChanged}>
                <option value="">Select category</option>
                {categoryOptions}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="noteContent">Content:</label>
              <textarea
                className="form-control"
                id="noteContent"
                name="noteContent"
                value={content}
                onChange={onContentChanged}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={onSaveNoteClicked} disabled={!canSave}>
              Save Note
            </button>
          </form>
        </section>
      )}
    </div>
  );
};
