import React from 'react';
import { X } from 'lucide-react';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface FAQSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const FAQSearch: React.FC<FAQSearchProps> = ({ searchQuery, onSearchChange }) => {
  const handleClearSearch = () => {
    onSearchChange('');
  };

  return (
    <div className="mb-6">
      <label className="block font-medium mb-3 text-xl leading-relaxed" style={{ color: COLORS.text_title, fontFamily: FONTS.heading_05.fontFamily, fontSize: FONTS.heading_05.fontSize, fontWeight: FONTS.heading_05.fontWeight }}>
        Search FAQ
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Search frequently asked questions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 rounded-md pr-10 border-0 focus:outline-none transition-all duration-200"
          style={{
            backgroundColor: COLORS.bg_Colour,
            color: COLORS.text_desc,
            fontFamily: FONTS.heading_05.fontFamily,
            fontSize: FONTS.heading_05.fontSize,
            height: '48px',
            boxShadow: `
              rgba(255, 255, 255, 0.7) 5px 5px 4px, 
              rgba(189, 194, 199, 0.75) 2px 2px 3px inset
            `
          }}
        />
        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" style={{ color: COLORS.text_desc }} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FAQSearch;