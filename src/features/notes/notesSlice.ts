import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  noteItems: [
    {
      id: '1',
      name: 'New Feature',
      created: new Date().toISOString(),
      category: 'Random Thought',
      content: 'Hello!',
      isArchive: false,
    },
    {
      id: '2',
      name: 'Shopping List',
      created: new Date().toISOString(),
      category: 'Random Thought',
      content: 'I’m gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021',
      isArchive: false,
    },
    {
      id: '3',
      name: 'William Gaddis',
      created: new Date().toISOString(),
      category: 'Idea',
      content: 'More text',
      isArchive: false,
    },
    {
      id: '4',
      name: 'Shopping List',
      created: new Date().toISOString(),
      category: 'Quote',
      content: 'More text',
      isArchive: false,
    },
    {
      id: '5',
      name: 'Shopping List',
      created: new Date().toISOString(),
      category: 'Random Thought',
      content: 'More text',
      isArchive: false,
    },
    {
      id: '6',
      name: 'Shopping List',
      created: new Date().toISOString(),
      category: 'Random Thought',
      content: 'More text',
      isArchive: false,
    },
    {
      id: '7',
      name: 'Shopping List',
      created: new Date().toISOString(),
      category: 'Task',
      content: 'The lean startup',
      isArchive: false,
    },
  ],
  categories: [
    {
      id: '0',
      type: 'Task',
    },
    { id: '1', type: 'Random Thought' },
    { id: '2', type: 'Idea' },
    { id: '3', type: 'Quote' },
  ],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    noteAdded: {
      reducer(state, action) {
        state.noteItems.push(action.payload);
      },
      prepare(name: string, category: string, content: string): any {
        return {
          payload: {
            id: nanoid(),
            name,
            created: new Date().toISOString(),
            category,
            content,
            dates: '',
            isArchive: false
          },
        };
      },
    },

    noteUpdated: {
      reducer(state, action) {
        const { id, name, created, category, content } = action.payload;
        const existingNote = state.noteItems.find((note) => note.id === id);
        console.log(existingNote);
        if (existingNote) {
          existingNote.name = name;
          existingNote.created = created;
          existingNote.category = category;
          existingNote.content = content;
        }
      },

      prepare(id: string, name: string, category: string, content: string): any {
        return {
          payload: {
            id,
            name,
            created: new Date().toISOString(),
            category,
            content,
          },
        };
      },
    },
    noteRemoved(state, action) {
      const noteId = action.payload;
      state.noteItems = state.noteItems.filter((note) => note.id !== noteId);
    },

    noteArchived(state, action) {
      const id  = action.payload;
      const existingNote = state.noteItems.find((note) => note.id === id);

      if (existingNote) {
        existingNote.isArchive = !existingNote.isArchive;
      }
    }
  },
});

export const { noteAdded, noteRemoved, noteUpdated, noteArchived } = notesSlice.actions;

export default notesSlice.reducer;
