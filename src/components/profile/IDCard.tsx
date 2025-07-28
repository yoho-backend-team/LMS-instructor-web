import React, { useEffect, useState } from 'react';
import { Download, QrCode } from 'lucide-react';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '@/features/Profile/reducers/selectors';
import { getStudentProfileThunk } from '@/features/Profile/reducers/thunks';

interface IDCardData {
  staffName: string;
  staffId: string;
  course: string;
  batch: string;
  validFrom: string;
  validUntil: string;
  institution: string;
  profileImage: string;
  bloodGroup?: string;
  emergencyContact?: string;
}

interface IDCardProps {
  data?: IDCardData;
}

const IDCard: React.FC<IDCardProps> = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);


  const dispatch = useDispatch<any>();
	const profileDetails = useSelector(selectProfile);

	useEffect(() => {
		dispatch(getStudentProfileThunk());
		console.log(profileDetails);
	}, [dispatch]);
  
  // Sample data - replace with actual data from props or API
  const idCardData: IDCardData = data || {
    staffName: profileDetails?.full_name,
    staffId: profileDetails?.userDetail?.staffId,
    course: 'Theoretical Physics',
    batch: 'Batch 2024-25',
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    institution: 'Classie',
    profileImage: 'https://img.freepik.com/premium-photo/character-portrait-albert-einstein-generate-by-ai_978242-594.jpg?w=2000',
    bloodGroup: 'O+',
    emergencyContact: '+1 234 567 8900'
  };

  const handleDownload = () => {
    // Implement ID card download functionality
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full">
      <div className="rounded-lg shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] flex flex-col"
        style={{ 
          width: '100%',
          marginTop: '1rem',
          height: '75vh',
          fontFamily: FONTS.para_01.fontFamily
        }}>
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-2xl leading-none" style={{ color: COLORS.text_title, fontFamily: FONTS.heading_01.fontFamily, fontWeight: FONTS.heading_01.fontWeight }}>
            Staff ID Card
            </h2>
          </div>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1 scrollbar-hide">
          {/* ID Card Preview */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-full max-w-80 h-[500px]" style={{ perspective: '1000px' }}>
              <div 
                className="relative w-full h-full transition-transform duration-700 cursor-pointer"
                onClick={handleCardClick}
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                }}
              >
                {/* Card Front */}
                <div className="absolute inset-0 w-full h-full rounded-2xl  overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                  {/* Half Color Design */}
                  <div className="h-full relative">
                    {/* Top Half - Colored */}
                    <div className="h-1/2 p-6 relative flex flex-col" style={{ background: `linear-gradient(135deg, ${COLORS.light_blue}, ${COLORS.purple_01})`, color: COLORS.white }}>
                      {/* Header */}
                      <div className="text-center mb-4">
                        <h3 className="text-lg font-bold mb-1" style={{ fontFamily: FONTS.heading_04.fontFamily }}>{idCardData.institution}</h3>
                        <p className="text-sm opacity-90" style={{ fontFamily: FONTS.para_01.fontFamily }}>STAFF ID CARD</p>
                        <div className="w-16 h-0.5 bg-white/50 mx-auto mt-2"></div>
                      </div>

                      {/* Profile Image */}
                      <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 rounded-full border-4 border-white/30 overflow-hidden bg-white/10">
                          <img 
                            src={idCardData.profileImage} 
                            alt={idCardData.staffName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Staff Info */}
                      <div className="text-center">
                        <h4 className="text-lg font-bold mb-1" style={{ fontFamily: FONTS.heading_04.fontFamily }}>{idCardData.staffName}</h4>
                        <p className="text-sm opacity-90" style={{ fontFamily: FONTS.para_01.fontFamily }}>{idCardData.course}</p>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                      <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full translate-y-6 -translate-x-6"></div>
                    </div>

                    {/* Bottom Half - White */}
                    <div className="h-1/2 p-6 bg-white relative flex flex-col" style={{ color: COLORS.text_desc }}>
                      {/* Details */}
                      <div className="space-y-2 text-sm flex-1" style={{ fontFamily: FONTS.para_01.fontFamily }}>
                        <div className="flex justify-between">
                          <span className="opacity-70">Staff ID:</span>
                          <span className="font-semibold">{idCardData.staffId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">Batch:</span>
                          <span className="font-semibold">{idCardData.batch}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-70">Blood Group:</span>
                          <span className="font-semibold">{idCardData.bloodGroup || 'N/A'}</span>
                        </div>
                       
                      </div>

                      {/* Bottom Section */}
                      <div className="flex items-end justify-between mt-4">
                        {/* Left side - Course details */}
                        <div className="text-xs" style={{ fontFamily: FONTS.para_01.fontFamily }}>
                          <div className="mb-1">
                            <span className="opacity-70">Duration:</span>
                            <div className="font-semibold">6 Months</div>
                          </div>
                        </div>

                        {/* Right side - Download button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload();
                          }}
                          className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-200 shadow-md"
                          style={{ backgroundColor: COLORS.bg_Colour }}
                          title="Download ID Card"
                        >
                          <Download className="w-5 h-5" style={{ color: COLORS.light_blue }} />
                        </button>
                      </div>

                      {/* Click to flip hint */}
                      <div className="absolute top-2 right-2 text-xs opacity-50" style={{ fontFamily: FONTS.para_01.fontFamily }}>
                        Click to flip
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Back */}
                <div className="absolute inset-0 w-full h-full rounded-2xl  overflow-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <div className="h-full relative" style={{ background: `linear-gradient(135deg, ${COLORS.purple_01}, ${COLORS.light_blue})`, color: COLORS.white }}>
                    {/* Header */}
                    <div className="text-center p-6 border-b border-white/20">
                      <h3 className="text-lg font-bold mb-1" style={{ fontFamily: FONTS.heading_04.fontFamily }}>QR Code</h3>
                      <p className="text-sm opacity-90" style={{ fontFamily: FONTS.para_01.fontFamily }}>Scan for verification</p>
                    </div>

                    {/* QR Code Section */}
                    <div className="flex-1 flex flex-col items-center justify-center p-8">
                      <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                        <QrCode className="w-32 h-32" style={{ color: COLORS.text_desc }} />
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm opacity-90 mb-2" style={{ fontFamily: FONTS.para_01.fontFamily }}>Staff ID: {idCardData.staffId}</p>
                        <p className="text-xs opacity-70" style={{ fontFamily: FONTS.para_01.fontFamily }}>Scan this QR code for quick verification</p>
                      </div>
                    </div>

                   

                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 -translate-x-10"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 translate-x-8"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ID Card Details */}
          <div className="mb-8">
            <h3 className="font-bold mb-6 text-xl leading-none" style={{ color: COLORS.text_title, fontFamily: FONTS.heading_02.fontFamily, fontWeight: FONTS.heading_02.fontWeight }}>
              ID Card Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block font-medium mb-2 text-sm leading-relaxed" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>
                  Staff Name
                </label>
                <div className="rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center" style={{ backgroundColor: COLORS.bg_Colour, fontFamily: FONTS.para_01.fontFamily, color: COLORS.text_desc }}>
                  {idCardData.staffName}
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2 text-sm leading-relaxed" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>
                  Staff ID
                </label>
                <div className="rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center" style={{ backgroundColor: COLORS.bg_Colour, fontFamily: FONTS.para_01.fontFamily, color: COLORS.text_desc }}>
                  {idCardData.staffId}
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2 text-sm leading-relaxed" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>
                  Course
                </label>
                <div className="rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center" style={{ backgroundColor: COLORS.bg_Colour, fontFamily: FONTS.para_01.fontFamily, color: COLORS.text_desc }}>
                  {idCardData.course}
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2 text-sm leading-relaxed" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>
                  Batch
                </label>
                <div className="rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center" style={{ backgroundColor: COLORS.bg_Colour, fontFamily: FONTS.para_01.fontFamily, color: COLORS.text_desc }}>
                  {idCardData.batch}
                </div>
              </div>



              <div>
                <label className="block font-medium mb-2 text-sm leading-relaxed" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>
                  Blood Group
                </label>
                <div className="rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center" style={{ backgroundColor: COLORS.bg_Colour, fontFamily: FONTS.para_01.fontFamily, color: COLORS.text_desc }}>
                  {idCardData.bloodGroup}
                </div>
              </div>

              

              <div className="md:col-span-2">
                <label className="block font-medium mb-2 text-sm leading-relaxed" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>
                  Institution
                </label>
                <div className="rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center" style={{ backgroundColor: COLORS.bg_Colour, fontFamily: FONTS.para_01.fontFamily, color: COLORS.text_desc }}>
                  {idCardData.institution}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block font-medium mb-2 text-sm leading-relaxed" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>
                  Emergency Contact
                </label>
                <div className="rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center" style={{ backgroundColor: COLORS.bg_Colour, fontFamily: FONTS.para_01.fontFamily, color: COLORS.text_desc }}>
                  {idCardData.emergencyContact}
                </div>
              </div>
            </div>
          </div>

          {/* Card Status */}
          <div className="mb-6">
            <h3 className="font-bold mb-4 text-xl leading-none" style={{ color: COLORS.text_title, fontFamily: FONTS.heading_02.fontFamily, fontWeight: FONTS.heading_02.fontWeight }}>
              Card Status
            </h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-green-800" style={{ fontFamily: FONTS.heading_06.fontFamily }}>Active ID Card</p>
                  <p className="text-sm text-green-600" style={{ fontFamily: FONTS.para_01.fontFamily }}>Your staff ID card is active and valid.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Digital Features */}
          <div className="mb-6">
            <h3 className="font-bold mb-4 text-xl leading-none" style={{ color: COLORS.text_title, fontFamily: FONTS.heading_02.fontFamily, fontWeight: FONTS.heading_02.fontWeight }}>
              Digital Features
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-lg p-4 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ backgroundColor: COLORS.bg_Colour }}>
                <div className="flex items-center gap-3">
                  <QrCode className="w-8 h-8" style={{ color: COLORS.light_blue }} />
                  <div>
                    <p className="font-semibold" style={{ color: COLORS.text_title, fontFamily: FONTS.heading_06.fontFamily }}>QR Code Access</p>
                    <p className="text-sm" style={{ color: COLORS.text_desc, fontFamily: FONTS.para_01.fontFamily }}>Quick verification and access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDCard;