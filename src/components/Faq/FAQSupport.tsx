import React from 'react';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface FAQSupportProps {
  onContactSupport?: () => void;
}

const FAQSupport: React.FC<FAQSupportProps> = ({ onContactSupport }) => {
  return (
    <div className="mt-12 text-center">
      <h3 
        className="font-bold mb-4" 
        style={{
          color: COLORS.text_title,
          fontFamily: FONTS.heading_02.fontFamily,
          fontWeight: FONTS.heading_02.fontWeight,
          fontSize: FONTS.para_01.fontSize
        }}
      >
        Need More Help?
      </h3>
      <p 
        className="mb-6 leading-relaxed"
        style={{
          color: COLORS.text_desc,
          fontFamily: FONTS.para_01.fontFamily,
          fontSize: FONTS.para_01.fontSize,
          // lineHeight: FONTS.para_01.lineHeight
        }}
      >
        If You Have Any Further Questions, Feel Free To Reach Out To Our Support Team.
      </p>
      <button
        onClick={onContactSupport}
        className="px-8  cursor-pointer py-3 rounded-md font-medium transition-all duration-200 hover:opacity-90 active:opacity-80"
        style={{
          backgroundColor: COLORS.bg_Colour,
          color: COLORS.text_title,
          fontFamily: FONTS.heading_05.fontFamily,
          fontSize: FONTS.heading_05.fontSize,
          fontWeight: FONTS.heading_05.fontWeight,
          boxShadow: `
            rgba(255, 255, 255, 0.7) 5px 5px 4px, 
            rgba(189, 194, 199, 0.75) 2px 2px 3px inset
          `,
          border: 'none',
          minHeight: '48px'
        }}
      >
        Contact Support
      </button>
    </div>
  );
};

export default FAQSupport;