export const getIcon = (category: string): string => {
  const icons: any = {
    Task: 'fa-solid fa-cart-shopping',
    'Random Thought': 'fa-regular fa-lightbulb',
    Idea: 'fa-solid fa-brain',
    Quote: 'fa-brands fa-freebsd',
  };

  return icons[category];
}