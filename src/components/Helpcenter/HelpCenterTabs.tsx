/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FONTS, COLORS } from '@/constants/uiConstants';
import type { HelpCenterTabsProps } from './types.ts';

const HelpCenterTabs: React.FC<HelpCenterTabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="mb-4">
      {/* Desktop/Tablet View */}
      <div className="hidden md:flex flex-wrap gap-2 lg:gap-3">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => onTabChange(tab?.category ?? 'All')}
            className={`px-2 lg:px-3 py-1.5 rounded-md flex items-center justify-center space-x-1 md:space-x-1.5 transition-all duration-200 cursor-pointer flex-1 min-w-0 whitespace-nowrap ${activeTab === tab.category
              ? 'bg-[#7b00ff] text-white'
              : 'bg-[#ebeff3] text-white'
              }`}
            style={{
              boxShadow: `
                rgba(255, 255, 255, 0.7) 2px 2px 4px, 
                rgba(189, 194, 199, 0.75) 1px 1px 2px inset
              `,
              ...FONTS.para_02,
              fontSize: '0.875rem',
              color: activeTab == tab.category ? '#ffffff' : COLORS.text_desc,
            }}
          >
            <span
              className="text-xs md:text-sm truncate"
              style={{ color: activeTab == tab.category ? '#ffffff' : COLORS.text_desc }}
            >
              {tab?.category}
            </span>
            {/* <span
              className="text-xs px-1 md:px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{
                backgroundColor: activeTab === tab.category ? 'rgba(255,255,255,0.2)' : COLORS.text_desc,
                fontSize: '0.65rem',
                color: COLORS.white,
              }}
            >
              {tab.count}
            </span> */}
          </button>
        ))}
      </div>

      {/* Mobile View - Scrollable horizontal tabs */}
      <div className="md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab: any) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-1.5 rounded-md flex items-center justify-center space-x-1.5 transition-all duration-200 cursor-pointer whitespace-nowrap flex-shrink-0 ${activeTab === tab.id
                ? 'bg-[#7b00ff] text-white'
                : 'bg-[#ebeff3] text-white'
                }`}
              style={{
                boxShadow: `
                  rgba(255, 255, 255, 0.7) 2px 2px 4px, 
                  rgba(189, 194, 199, 0.75) 1px 1px 2px inset
                `,
                ...FONTS.para_02,
                fontSize: '0.875rem',
                color: activeTab === tab.id ? '#ffffff' : COLORS.text_desc,
                minWidth: 'fit-content',
              }}
            >
              <span
                className="text-sm"
                style={{ color: activeTab === tab.id ? '#ffffff' : COLORS.text_desc }}
              >
                {tab.label}
              </span>
              <span
                className="text-xs px-1.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : COLORS.text_desc,
                  fontSize: '0.75rem',
                  color: COLORS.white,
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpCenterTabs;