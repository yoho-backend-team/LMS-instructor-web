import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import bgImg from '../../assets/classes/Group 197.png';
import dayjs from 'dayjs'

interface ClassItem {
  start_date: string;
  class_name: string;
  video_url: string;
  duration: string;
  courseDetails: {
    class_type: string;
  }
}

interface UpcomingclassProps {
  showOnlineOnly?: boolean;
  data: ClassItem[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Upcomingclass = ({ showOnlineOnly, data, currentPage, onPageChange }: UpcomingclassProps) => {
  // Filter based on online/offline toggle
  const filteredClasses = showOnlineOnly
    ? data.filter(classItem => classItem.courseDetails.class_type?.[0] === 'online')
    : data.filter(classItem => classItem.courseDetails.class_type?.[0] === 'offline');

      console.log("Dataaa", filteredClasses)
      console.log("Dataaa1", showOnlineOnly)

  // Optional pagination logic (can be adjusted as needed)
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredClasses.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);


  // Table headers
  const headers = ['Day', 'Topic', 'Join Link', 'Duration', 'Action'];

  return (
    <div className='bg-[#ebeff3] min-h-[300px]'>
      {filteredClasses.length === 0 ? (
        <div className="flex justify-center items-center h-full py-20">
          <img className="w-[250px]" src={bgImg} alt="No Classes" />
        </div>
      ) : (
        <Card style={{ backgroundColor: COLORS.bg_Colour }}>
          {/* Table Header */}
          <Card className='bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white mx-4 p-4'>
            <table className="w-full">
              <thead>
                <tr className='grid grid-cols-5 text-center items-center !text-white' style={{ ...FONTS.heading_03 }}>
                  {headers.map((header, index) => (
                    <td key={index}>{header}</td>
                  ))}
                </tr>
              </thead>
            </table>
          </Card>

          {/* Class List */}
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
                  <tr className='grid grid-cols-5 items-center text-center' style={{ ...FONTS.heading_06 }}>
                    <td>{dayjs(classItem.start_date).format('DD-MMM-YYYY')}</td>
                    <td>{classItem.class_name}</td>
                    <td>
                      <a className='!text-[#0400ff]' href={classItem.video_url} target="_blank" rel="noopener noreferrer">
                        {classItem.video_url}
                      </a>
                    </td>
                    <td>{classItem.duration}</td>
                    <td>
                      <Button
                        className='bg-[#ebeff3] cursor-pointer shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
                        variant="outline"
                      >
                        Join Soon
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
          ))}

          {/* Pagination */}
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
        </Card>
      )}
    </div>
  );
};

export default Upcomingclass;