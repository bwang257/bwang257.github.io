import { useTheme } from '../contexts/ThemeContext';
import { highLevelTags } from '../lib/projects';

interface ProjectFilterProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ProjectFilter({
  selectedTags,
  onTagToggle,
  searchQuery,
  onSearchChange
}: ProjectFilterProps) {
  const { colors } = useTheme();

  return (
    <div className="space-y-6 mb-12">
      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 border rounded-md text-base transition-all duration-150"
          style={{
            borderColor: colors.border,
            color: colors.text,
            backgroundColor: colors.bgSecondary
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = colors.accent;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = colors.border;
          }}
        />
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-3">
        {highLevelTags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onTagToggle(tag)}
              className="px-4 py-2 border rounded-md text-sm transition-all duration-150 font-medium"
              style={{
                borderColor: isSelected ? colors.accent : colors.border,
                color: isSelected ? colors.accent : colors.text,
                backgroundColor: isSelected
                  ? 'rgba(21, 128, 61, 0.08)'
                  : colors.bgSecondary
              }}
              onFocus={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = colors.accent;
                }
              }}
              onBlur={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = colors.border;
                }
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = colors.accent;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = colors.border;
                }
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
