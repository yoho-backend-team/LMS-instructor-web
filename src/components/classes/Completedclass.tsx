import { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { COLORS, FONTS } from '@/constants/uiConstants'
import filterImg from '../../assets/classes/filter.png'
import { useNavigate } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

interface DropdownOption {
  value: string;
  label: string;
}

interface FilterGroup {
  title: string;
  options: DropdownOption[];
}

interface CompletedclassProps {
  data: any[]; 
  showOnlineOnly: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Completedclass: React.FC<CompletedclassProps> = ({ data, showOnlineOnly, currentPage, onPageChange }) => {
  const months: DropdownOption[] = [
    { value: 'jan', label: 'January' },
    { value: 'feb', label: 'February' },
    { value: 'mar', label: 'March' },
    { value: 'apr', label: 'April' },
  ];

  const years: DropdownOption[] = Array.from({ length: 5 }, (_, i) => ({
    value: (2015 + i).toString(),
    label: (2015 + i).toString()
  }));

  const courses: DropdownOption[] = [
    { value: 'html', label: 'HTML' },
    { value: 'js', label: 'JAVA SCRIPT' },
    { value: 'css', label: 'CSS' },
    { value: 'react', label: 'React' },
  ];

  const classes: DropdownOption[] = Array.from({ length: 4 }, (_, i) => ({
    value: `class-${i+1}`,
    label: `class ${i+1}`
  }));

  const filterGroups: FilterGroup[] = [
    { title: 'Month', options: months },
    { title: 'Year', options: years },
    { title: 'Courses', options: courses },
    { title: 'Classes', options: classes }
  ];

  const navigate = useNavigate();
  const headers = ['Title', 'Start Date', 'Start Time', 'Duration', 'Action'];

  const handleClassDetailPage = (id: string) => {
    navigate(`/class/${id}`);
  };

  const [showFilters, setShowFilters] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setOpenDropdown(null);
  };

  const toggleDropdown = (title: string) => {
    setOpenDropdown(openDropdown === title ? null : title);
  };

  const selectOption = (groupTitle: string, value: string) => {
    setSelectedFilters(prev => ({ ...prev, [groupTitle]: value }));
    setOpenDropdown(null);
  };
  
  return (
    <div style={{ backgroundColor: COLORS.bg_Colour }} className='mb-4'>
      {/* Filter Section */}
        <Card style={{ backgroundColor: COLORS.bg_Colour }} className='h-[80px] mb-3' >
      {/* Filter buttons - only shown when showFilters is true */}
      {showFilters && (
        <div className='ml-6 grid lg:grid-cols-8 md:grid-cols-6 justify-between gap-2'>
          
          {filterGroups.map((group) => (
            <div key={group.title} className="relative">
              <Button
                style={{...FONTS.heading_07}}
                variant="outline"
                className=" cursor-pointer w-[120px] justify-between bg-[#ebeff3] 
                          shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]"
                onClick={() => toggleDropdown(group.title)}
              >
                {selectedFilters[group.title] || group.title}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>

              {/* Dropdown items - only shown when this dropdown is open */}
              {openDropdown === group.title && (
                <div className="absolute z-50 w-[120px] mt-2 bg-[#ebeff3] 
                            shadow-[2px_2px_3px_rgba(189,194,199,0.75)_inset] rounded-md p-1">
                  {group.options.map((option) => (
                    <div
                    style={{...FONTS.para_02}}
                      key={option.value}
                      className={`p-2 m-2 cursor-pointer rounded-sm
                                ${selectedFilters[group.title] === option.value 
                                  ? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white' 
                                  : 'bg-[#ebeff3] hover:bg-[#dde1e5]'}
                                shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]`}
                      onClick={() => selectOption(group.title, option.value)}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Filter image - always visible */}
      <div>
        <img 
          src={filterImg} 
          alt="filter" 
          className="absolute right-[60px] top-[255px] cursor-pointer p-2 rounded-lg bg-[#ebeff3] 
                  shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]"
          onClick={toggleFilters}
        />
      </div>
    </Card>

      {/* Table Section */}
      <Card style={{ backgroundColor: COLORS.bg_Colour }}>
        {/* Header Row */}
        <Card className='bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white mx-4 p-4'>
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

        {/* Data Rows */}
        <div className="space-y-2 mx-2 mb-2">
          {data.map((item) => (
            <Card 
              key={item.id}
              className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4
                        transition-all duration-300 ease-in-out
                        hover:-translate-y-1 
                        hover:shadow-[6px_6px_8px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.8)]
                        cursor-pointer'
            >
              <div className="grid grid-cols-5 gap-4 items-center" style={{ ...FONTS.heading_06 }}>
                <div className="truncate text-center">{item.courseDetails?.course_name || 'N/A'}</div>
                <div className="text-center">{(item.start_date || '').slice(0,10)}</div>
                <div className="text-center">{(item.start_time || '').slice(11,16)}</div>
                <div className="text-center">{item.duration || '0'} Min</div>
                <div className="flex justify-center">
                  <Button 
                    onClick={() => handleClassDetailPage(item.uuid)}
                    className="cursor-pointer bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600
                              shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,-4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),-1px_-1px_6px_1px_rgba(255,255,255,0.25)]"
                  >
                    Completed
                  </Button>
                </div> 
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center p-4">
          <Button 
            onClick={() => onPageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="mr-2 bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]"
          >
            Previous
          </Button>
          <span className="mx-4" style={{ ...FONTS.heading_06 }}>Page {currentPage}</span>
          <Button 
            onClick={() => onPageChange(currentPage + 1)}
            className="ml-2 bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]"
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Completedclass;