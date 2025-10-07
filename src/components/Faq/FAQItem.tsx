import React from 'react';
import { COLORS, FONTS } from '@/constants/uiConstants';
import plus from "../../assets/faq/Add.png"
import minus from "../../assets/faq/minus.png"

interface FAQItemProps {
  id: string;
  question: string;
  content?: string;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ id, question, content, isExpanded, onToggle }) => {
  return (
    <div className="mb-4">
      {/* Question Header */}
      <div className="relative rounded-lg"
        style={{ 
          backgroundColor: COLORS.bg_Colour,
          boxShadow: `
            rgba(255, 255, 255, 0.7) 3px 3px 5px, 
            rgba(189, 194, 199, 0.75) 2px 2px 3px inset
          `
        }}>
        <button
          onClick={() => onToggle(id)}
          className="w-full px-5 py-4 text-left flex items-center justify-between rounded-lg focus:outline-none transition-all duration-200 hover:opacity-95"
          style={{
            fontFamily: FONTS.heading_05.fontFamily,
            fontSize: FONTS.heading_05.fontSize,
            fontWeight: FONTS.heading_05.fontWeight,
            color: COLORS.text_title,
            minHeight: '56px'
          }}
        >
          <span className="pr-4">
            {question}
          </span>
          <div 
            className="flex-shrink-0 w-8 h-2 rounded-md flex items-center justify-center transition-all duration-200"
           style={{
                       backgroundColor: COLORS.bg_Colour,
                       boxShadow: `
                         rgba(255, 255, 255, 0.7) 3px 3px 5px, 
                         rgba(189, 194, 199, 0.75) 2px 2px 3px inset
                       `,
                       border: 'none',
                       minHeight: '40px'
                     }}
                   >
            {isExpanded ? (
              <img src={minus}  />
            ) : (
              <img src={plus}/>
            )}
          </div>
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && content && (
        <div className="mt-3 space-y-3">
          {content.split('\n\n').map((paragraph, index) => {
            // Split paragraph into individual lines for separate input boxes
            const lines = paragraph.split('\n').filter(line => line.trim() !== '');
            
            return (
              <div key={index} className="space-y-2">
                {lines.map((line, lineIndex) => (
                  <div
                    key={`${index}-${lineIndex}`}
                    className="relative rounded-lg px-4 py-3 text-sm leading-relaxed"
                    style={{
                      backgroundColor: COLORS.bg_Colour,
                      fontFamily: FONTS.para_01.fontFamily,
                      color: COLORS.text_desc,
                      fontSize: FONTS.para_01.fontSize,
                      boxShadow: `
                        rgba(255, 255, 255, 0.7) 5px 5px 4px, 
                        rgba(189, 194, 199, 0.75) 2px 2px 3px inset
                      `,
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FAQItem;