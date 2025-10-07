import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { useLoader } from '@/context/LoadingContext/Loader';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface ClassItem {
  day: string;
  topic: string;
  joinLink: string;
  duration: string;
  classtype: string;
}

interface LiveclassProps {
  showOnlineOnly: boolean;
  data: ClassItem[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Liveclass = ({ showOnlineOnly, data, currentPage, onPageChange }: LiveclassProps) => {
  // Filter based on online/offline toggle
  const filteredClasses = showOnlineOnly
    ? data.filter(classItem => classItem.classtype === 'online')
    : data.filter(classItem => classItem.classtype === 'offline');

  // Optional pagination logic (can be adjusted as needed)
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredClasses.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);

  // Table headers
  const headers = ['Day', 'Topic', 'Join Link', 'Duration', 'Action'];

  const dispatch = useDispatch<any>();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    (async () => {
      try {
        showLoader();
        const timeoutId = setTimeout(() => {
          hideLoader();
        }, 8000);
        const response = await dispatch(getDashBoardReports());
        if (response) {
          clearTimeout(timeoutId);
        }
      } finally {
        hideLoader();
      }
    })();
  }, [dispatch, hideLoader, showLoader]);

  return (
    <div>
      <Card style={{ backgroundColor: COLORS.bg_Colour }}>
        {/* Desktop Table Header - Hidden on mobile */}
        <Card className='hidden md:block bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white mx-4 p-4'>
          <table className="w-full">
            <thead>
              <tr className='flex justify-around items-center !text-white' style={{ ...FONTS.heading_03 }}>
                {headers.map((header, index) => (
                  <td key={index}>{header}</td>
                ))}
              </tr>
            </thead>
          </table>
        </Card>

        {/* ✅ No data available */}
        {filteredClasses.length === 0 ? (
          <p className="text-center text-gray-600 py-6" style={{ ...FONTS.heading_06 }}>
            No classes available.
          </p>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="block md:hidden px-4 py-4">
              <div className="space-y-4">
                {paginatedData.map((classItem, index) => (
                  <Card
                    key={`mobile-${index}`}
                    className='bg-white rounded-lg p-4 shadow-[3px_3px_5px_rgba(189,194,199,0.5),-2px_-2px_5px_rgba(255,255,255,0.8)] hover:shadow-lg transition-shadow duration-300'
                  >
                    <div className="space-y-3">
                      {/* Day and Duration */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#7B00FF] to-[#B200FF] rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {classItem.day?.charAt(0) || 'D'}
                            </span>
                          </div>
                          <span className="font-semibold text-gray-800" style={{ ...FONTS.heading_07 }}>
                            {classItem.day || 'monday'}
                          </span>
                        </div>
                        <div className="bg-[#EBEFF3] px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-[2px_2px_3px_rgba(189,194,199,0.5)]">
                          {classItem.duration || '8 hrs'}
                        </div>
                      </div>

                      {/* Topic */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Topic</p>
                        <p className="font-medium text-gray-800 text-sm" style={{ ...FONTS.heading_07 }}>
                          {classItem.topic || 'react'}
                        </p>
                      </div>

                      {/* Join Link */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Join Link</p>
                        <a 
                          className='text-[#0400ff] text-sm break-all hover:text-[#B200FF] block' 
                          href={classItem.joinLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {classItem.joinLink}
                        </a>
                      </div>

                      {/* Class Type and Action */}
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            classItem.classtype === 'online' ? 'bg-green-500' : 'bg-blue-500'
                          }`}></div>
                          <span className="text-xs text-gray-600 capitalize">
                            {classItem.classtype}
                          </span>
                        </div>
                        <Button
                          className='bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white px-4 py-2 text-sm rounded-lg shadow-[2px_2px_4px_rgba(189,194,199,0.5)] hover:shadow-lg transition-all'
                        >
                          Join Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block">
              {paginatedData.map((classItem, index) => (
                <Card
                  key={`desktop-${index}`}
                  className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black mx-4 p-4
                            transition-all duration-300 ease-in-out
                            hover:-translate-y-1 
                            hover:shadow-[6px_6px_8px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.8)]
                            cursor-pointer'
                >
                  <table className="w-full">
                    <tbody>
                      <tr className='flex justify-around items-center' style={{ ...FONTS.heading_06 }}>
                        <td>{classItem.day}</td>
                        <td>{classItem.topic}</td>
                        <td>
                          <a className='!text-[#0400ff]' href={classItem.joinLink} target="_blank" rel="noopener noreferrer">
                            {classItem.joinLink}
                          </a>
                        </td>
                        <td>{classItem.duration}</td>
                        <td>
                          <Button
                            className='bg-[#ebeff3] cursor-pointer shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
                            variant="outline"
                          >
                            Join Now
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              ))}
            </div>

            {/* ✅ Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-4 p-4">
                <Button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="outline"
                  className="bg-[#EBEFF3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                >
                  Prev
                </Button>
                <span style={{ ...FONTS.heading_06 }} className="flex items-center">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  className="bg-[#EBEFF3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default Liveclass;