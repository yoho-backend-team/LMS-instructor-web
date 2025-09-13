import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';

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

  // ...inside your component

return (
  <div>
    <Card style={{ backgroundColor: COLORS.bg_Colour }}>
      {/* Table Header */}
      <Card className='bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white mx-4 p-4'>
        <table className="w-full">
          <thead>
            <tr className='flex justify-around items-center !text-whiteg' style={{ ...FONTS.heading_03 }}>
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
          {/* ✅ Render filtered & paginated class items */}
          {paginatedData.map((classItem, index) => (
            <Card
              key={index}
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

          {/* ✅ Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-4">
              <Button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
              >
                Prev
              </Button>
              <span style={{ ...FONTS.heading_06 }}>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
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
