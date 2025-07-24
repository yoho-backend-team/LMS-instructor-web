import React from 'react';
import { Settings, CreditCard } from 'lucide-react';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

interface ProfileMenuProps {
  activeItem?: string;
  onMenuItemClick?: (itemId: string) => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ activeItem = 'profile', onMenuItemClick }) => {
  const menuItems: MenuItem[] = [
    {
      id: 'profile',
      label: 'Profile Information',
      icon: <Settings className="w-4 h-4" />,
      isActive: activeItem === 'profile'
    },
   
    {
      id: 'idcard',
      label: 'ID Card',
      icon: <CreditCard className="w-4 h-4" />,
      isActive: activeItem === 'idcard'
    }
  ];

  const handleItemClick = (itemId: string) => {
    if (onMenuItemClick) {
      onMenuItemClick(itemId);
    }
  };

  return (
    <div className="space-y-2 w-full">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 w-full ${
            item.isActive
              ? 'shadow-[inset_3px_3px_5px_rgba(123,0,255,0.3),inset_-3px_-3px_5px_rgba(255,255,255,0.7)]'
              : 'shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:shadow-[inset_1px_1px_2px_rgba(189,194,199,0.5)]'
          }`}
          style={{
            backgroundColor: item.isActive ? COLORS.light_blue : COLORS.bg_Colour,
            color: item.isActive ? COLORS.white : COLORS.text_desc,
            fontFamily: FONTS.para_01.fontFamily
          }}
          onClick={() => handleItemClick(item.id)}
        >
          <div className="flex items-center space-x-2 sm:space-x-3 w-full">
            <div 
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                item.isActive 
                  ? 'bg-white bg-opacity-20' 
                  : 'shadow-[inset_2px_2px_4px_rgba(189,194,199,0.75),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]'
              }`}
              style={{
                backgroundColor: item.isActive ? 'rgba(255, 255, 255, 0.2)' : COLORS.bg_Colour
              }}
            >
              <div className="w-3 h-3 sm:w-4 sm:h-4">
                {item.icon}
              </div>
            </div>
            <span className="font-medium text-xs sm:text-sm leading-relaxed flex-1 truncate" style={{ fontFamily: FONTS.para_01.fontFamily }}>
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileMenu;