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
  dark: {
    name: 'Dark',
    colors: {
      bg: '#0c0c0c',
      bgSecondary: 'rgba(12, 12, 12, 0.95)',
      bgTertiary: 'rgba(12, 12, 12, 0.5)',
      text: '#e5e5e5',
      textSecondary: '#e5e5e5',
      textMuted: 'rgba(229, 229, 229, 0.6)',
      textMutedLight: 'rgba(229, 229, 229, 0.4)',
      border: 'rgba(255, 255, 255, 0.1)',
      accent: '#00ff00',
      accentHover: '#33ff33',
      warning: '#cc4444',
      warningHover: '#dd5555',
      info: '#ffaa00',
      infoHover: '#ffcc00',
      neutral: '#888888',
    }
  },
  light: {
    name: 'Light',
    colors: {
      bg: '#f5f5f5',
      bgSecondary: 'rgba(245, 245, 245, 0.95)',
      bgTertiary: 'rgba(245, 245, 245, 0.5)',
      text: '#1a1a1a',
      textSecondary: '#2a2a2a',
      textMuted: 'rgba(26, 26, 26, 0.6)',
      textMutedLight: 'rgba(26, 26, 26, 0.4)',
      border: 'rgba(0, 0, 0, 0.1)',
      accent: '#00aa00',
      accentHover: '#00cc00',
      warning: '#aa3333',
      warningHover: '#bb4444',
      info: '#cc8800',
      infoHover: '#eeaa00',
      neutral: '#666666',
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' ? 'light' : 'dark';
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

