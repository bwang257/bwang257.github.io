import { ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className = '', onClick, hoverable = false }: CardProps) {
  const { colors } = useTheme();

  return (
    <div
      className={`rounded-lg border transition-all duration-150 ${className}`}
      style={{
        backgroundColor: colors.bgSecondary,
        borderColor: colors.border,
        boxShadow: hoverable ? colors.shadowCard : colors.shadowCard,
        cursor: onClick ? 'pointer' : 'default'
      }}
      onMouseEnter={(e) => {
        if (hoverable) {
          e.currentTarget.style.boxShadow = colors.shadowCardHover;
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable) {
          e.currentTarget.style.boxShadow = colors.shadowCard;
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

