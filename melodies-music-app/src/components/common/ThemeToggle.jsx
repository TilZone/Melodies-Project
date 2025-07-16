import { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

import { usePlayerStore } from '../../store/usePlayerStore';

const ThemeToggle = () => {
  // Use shallow selector to prevent re-renders when other state changes
  const { theme, toggleTheme } = usePlayerStore((state) => ({
    theme: state.theme,
    toggleTheme: state.toggleTheme,
  }));

  // Effect to apply the theme class to the <html> element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeToggle;
