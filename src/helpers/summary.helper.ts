import { Note } from '../types/types';

export const getSummaryData = (notes: Note[], categories: any) => {
  const summary: any = {};
  notes.forEach((note: Note) => {
    categories.forEach((category: any) => {
      if (category.type === note.category) {
        summary[category.type] = summary[category.type] ? ++summary[category.type] : 1;
      }
    });
  });

  return summary;
};
