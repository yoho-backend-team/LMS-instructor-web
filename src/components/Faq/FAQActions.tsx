import React from 'react';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface FAQActionsProps {
  onExpandAll: () => void;
  onCollapseAll: () => void;
  totalItems: number;
  expandedCount: number;
}

const FAQActions: React.FC<FAQActionsProps> = ({ 
  onExpandAll, 
  onCollapseAll, 
  totalItems, 
  expandedCount 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div  style={{ 
        color: COLORS.text_desc, 
        fontFamily: FONTS.para_01.fontFamily,
        fontSize: FONTS.heading_05.fontSize 
      }}>
        Showing {totalItems} FAQ{totalItems !== 1 ? 's' : ''} 
        {expandedCount > 0 && ` (${expandedCount} expanded)`}
      </div>
      
      <div className="flex gap-3">
        <button
          onClick={onExpandAll}
          className="px-6 py-2 cursor-pointer rounded-lg font-medium transition-all duration-200 hover:opacity-90 active:opacity-80"
          style={{
            backgroundColor: COLORS.bg_Colour,
            color: COLORS.text_title,
            fontFamily: FONTS.heading_06.fontFamily,
            fontSize: FONTS.heading_06.fontSize,
            fontWeight: FONTS.heading_06.fontWeight,
            boxShadow: `
              rgba(255, 255, 255, 0.7) 3px 3px 5px, 
              rgba(189, 194, 199, 0.75) 2px 2px 3px inset
            `,
            border: 'none',
            minHeight: '40px'
          }}
        >
          Expand All
        </button>
        
        <button
          onClick={onCollapseAll}
          className="px-6 py-2 cursor-pointer rounded-lg font-medium transition-all duration-200 hover:opacity-90 active:opacity-80"
          style={{
            backgroundColor: COLORS.bg_Colour,
            color: COLORS.text_title,
            fontFamily: FONTS.heading_06.fontFamily,
            fontSize: FONTS.heading_06.fontSize,
            fontWeight: FONTS.heading_06.fontWeight,
            boxShadow: `
              rgba(255, 255, 255, 0.7) 3px 3px 5px, 
              rgba(189, 194, 199, 0.75) 2px 2px 3px inset
            `,
            border: 'none',
            minHeight: '40px'
          }}
        >
          Collapse All
        </button>
      </div>
    </div>
  );
};

export default FAQActions;