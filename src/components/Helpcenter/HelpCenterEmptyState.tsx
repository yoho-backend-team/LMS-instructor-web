import React from 'react';
import { FONTS, COLORS } from '@/constants/uiConstants';
import helpcenterImage from '@/assets/helpcenters/helpcenter.png';

interface HelpCenterEmptyStateProps {
  searchQuery?: string;
  activeTab?: string;
}

const HelpCenterEmptyState: React.FC<HelpCenterEmptyStateProps> = ({ 
  searchQuery, 
}) => {
  const isSearchResult = searchQuery && searchQuery.trim().length > 0;
  
  
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4 sm:px-6 text-center">
      {/* Image */}
      <div className="mb-6 sm:mb-8 w-full max-w-xs sm:max-w-sm md:max-w-md">
        <img 
          src={helpcenterImage} 
          alt="Help Center" 
          className="w-full h-auto object-contain opacity-80"
          
        />
      </div>
      
      {/* Title */}
      <h3 
        className="mb-4 text-lg sm:text-xl lg:text-2xl"
        style={{
          ...FONTS.heading_02,
          color: COLORS.text_title,
          marginTop: '10px',
        }}
      >
        {isSearchResult ? 'No Results Found' : 'No Help Topics Available'}
      </h3>
      
    </div>
  );
};

export default HelpCenterEmptyState;