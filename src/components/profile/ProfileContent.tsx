import React from 'react';
import PersonalInformation from './PersonalInformation';
import InstituteInformation from './InstituteInformation';
import IDCard from './IDCard';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface PersonalInfo {
  mailAddress: string;
  name: string;
  gender: string;
  qualification: string;
  contactNumber: string;
  alternateNumber: string;
  dateOfBirth: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
}

interface InstituteInfo {
  course: string;
  batch: string;
  studentId: string;
}

interface ProfileContentProps {
  personalInfo: PersonalInfo;
  instituteInfo: InstituteInfo;
  onPersonalInfoChange?: (data: PersonalInfo) => void;
  onInstituteInfoChange?: (data: InstituteInfo) => void;
  isEditing?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  activeMenuItem?: string;
  isSaving?: boolean;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ 
  personalInfo, 
  instituteInfo, 
  onPersonalInfoChange, 
  onInstituteInfoChange,
  isEditing = false,
  onSave,
  onCancel,
  activeMenuItem = 'profile',
  isSaving = false
}) => {
  // Render content based on active menu item
  const renderContent = () => {
    switch (activeMenuItem) {
      case 'idcard':
        return (
          <div className="flex-1 w-full">
            <IDCard />
          </div>
        );
      case 'profile':
      default:
        return (
          <div className="flex-1 w-full px-2 sm:px-0">
            <div className="rounded-lg shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] flex flex-col"
            style={{ 
              width: '100%',
              marginTop: '1rem',
              height: '75vh',
              fontFamily: FONTS.para_01.fontFamily
             }}>
              {/* Header with Save/Cancel buttons */}
              {isEditing && (
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 p-3 sm:p-4 border-b border-gray-200 flex-shrink-0">
                  <button
                    onClick={onCancel}
                    disabled={isSaving}
                    className="px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:shadow-[inset_3px_3px_5px_rgba(189,194,199,0.75),inset_-3px_-3px_5px_rgba(255,255,255,0.7)] text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: COLORS.bg_Colour,
                      color: COLORS.text_desc,
                      fontFamily: FONTS.para_01.fontFamily,
                      fontSize: FONTS.para_01.fontSize
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onSave}
                    disabled={isSaving}
                    className="px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:shadow-[inset_3px_3px_5px_rgba(123,0,255,0.3),inset_-3px_-3px_5px_rgba(255,255,255,0.7)] text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: COLORS.light_blue,
                      color: COLORS.white,
                      fontFamily: FONTS.para_01.fontFamily,
                      fontSize: FONTS.para_01.fontSize
                    }}
                  >
                    {isSaving && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
              
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 scrollbar-hide">
                <PersonalInformation 
                  data={personalInfo} 
                  onDataChange={onPersonalInfoChange}
                  isEditing={isEditing}
                />
                <InstituteInformation 
                  data={instituteInfo} 
                  onDataChange={onInstituteInfoChange}
                  isEditing={isEditing}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return renderContent();
};

export default ProfileContent;