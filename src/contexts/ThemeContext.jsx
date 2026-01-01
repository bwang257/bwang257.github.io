import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const themes = {
  light: {
    name: 'Light',
    colors: {
      // Canvas + Surfaces
      bg: '#f3f4f6', // neutral gray canvas
      bgSecondary: '#ffffff', // white cards
      bgTertiary: '#fafafa', // optional secondary surface
      // Typography
      text: '#374151', // body text
      textSecondary: '#111827', // headings
      textMuted: '#6b7280', // secondary/meta text
      textMutedLight: '#9ca3af', // tertiary text
      // Borders
      border: '#e5e7eb', // borders
      divider: '#e5e7eb', // dividers
      // Accent
      accent: '#15803d', // professional green
      accentHover: '#166534', // darker green for hover
      // Shadows (for CSS use)
      shadowCard: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
      shadowCardHover: '0 2px 6px rgba(0,0,0,0.06), 0 12px 30px rgba(0,0,0,0.10)',
      // Legacy support
      warning: '#15803d',
      warningHover: '#166534',
      info: '#15803d',
      infoHover: '#166534',
      neutral: '#6b7280',
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      bg: '#0f1115',
      bgSecondary: '#111827',
      bgTertiary: 'rgba(255, 255, 255, 0.02)',
      text: '#e5e7eb',
      textSecondary: '#e5e7eb',
      textMuted: '#9ca3af',
      textMutedLight: '#6b7280',
      border: 'rgba(255, 255, 255, 0.08)',
      divider: 'rgba(255, 255, 255, 0.06)',
      accent: '#22c55e',
      accentHover: '#16a34a',
      shadowCard: '0 1px 2px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.3)',
      shadowCardHover: '0 2px 6px rgba(0,0,0,0.3), 0 12px 30px rgba(0,0,0,0.4)',
      warning: '#22c55e',
      warningHover: '#16a34a',
      info: '#22c55e',
      infoHover: '#16a34a',
      neutral: '#6b7280',
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' ? 'dark' : 'light'; // Default to light theme
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    // Apply theme colors to root element
    const colors = themes[theme].colors;
    document.documentElement.style.setProperty('--bg-primary', colors.bg);
    document.documentElement.style.setProperty('--text-primary', colors.text);
    document.documentElement.style.setProperty('--border-color', colors.border);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const value = {
    theme,
    themeName: themes[theme].name,
    colors: themes[theme].colors,
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

