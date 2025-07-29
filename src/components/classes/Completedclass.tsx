import { useState, useMemo } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import filterImg from '../../assets/classes/filter.png';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';

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
  classType: boolean;
}

const Completedclass: React.FC<CompletedclassProps> = ({ data,classType }) => {
  const navigate = useNavigate();
  const headers = ['Title', 'Start Date', 'Start Time', 'Duration', 'Action'];

  const months: DropdownOption[] = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
  ];

  const years: DropdownOption[] = Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
  });

  // Get unique courses from data
  const courses = useMemo(() => {
    const courseSet = new Set<string>();
    data.forEach(item => {
      if (item.courseDetails?.course_name) {
        courseSet.add(item.courseDetails.course_name);
      }
    });
    return Array.from(courseSet).map(course => ({
      value: course,
      label: course
    }));
  }, [data]);

  

  const filterGroups: FilterGroup[] = [
    { title: 'Month', options: months },
    { title: 'Year', options: years },
    { title: 'Course', options: courses },
  ];

  const [showFilters, setShowFilters] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const toggleFilters = () => {
    setShowFilters(prev => !prev);
    setOpenDropdown(null);
  };

  const toggleDropdown = (title: string) => {
    setOpenDropdown(prev => (prev === title ? null : title));
  };

  const selectOption = (groupTitle: string, value: string) => {
    setSelectedFilters(prev => ({ ...prev, [groupTitle]: value }));
    setOpenDropdown(null);
  };

  const clearFilters = () => {
    setSelectedFilters({});
  };

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const date = item.start_date || '';
      const month = date.slice(5, 7);
      const year = date.slice(0, 4);
      const courseName = item.courseDetails?.course_name || '';

      return (
        (!selectedFilters.Month || month === selectedFilters.Month) &&
        (!selectedFilters.Year || year === selectedFilters.Year) &&
        (!selectedFilters.Course || courseName === selectedFilters.Course)
      );
    });
  }, [data, selectedFilters]);

  const handleClassDetailPage = (id: string) => {
    navigate(`/class/${classType}/${id}`);
  };

  
  const hasActiveFilters = Object.keys(selectedFilters).length > 0;

  return (
    <div style={{ backgroundColor: COLORS.bg_Colour }} className="mb-4">
      {/* Sticky Filter Section */}
      <div className="sticky top-0 z-10 bg-[#f1f3f5] pt-2 pb-3">
  <Card style={{ backgroundColor: COLORS.bg_Colour }} className="px-4 py-3 shadow-sm">
    <div className="flex justify-between items-center">
      {/* Filter content (left side) - Only appears when filters are shown */}
      {showFilters && (
        <div className="flex-1 mr-4 grid grid-cols-6 gap-4">
          {filterGroups.map((group) => (
            <div key={group.title} className="relative">
              <Button
                style={{ ...FONTS.heading_07 }}
                variant="outline"
                className="cursor-pointer w-full justify-between bg-[#ebeff3] 
                shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]"
                onClick={() => toggleDropdown(group.title)}
              >
                {selectedFilters[group.title] || group.title}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>

              {openDropdown === group.title && (
                <div className="absolute z-50 w-full mt-1 bg-[#ebeff3] 
                  shadow-[2px_2px_3px_rgba(189,194,199,0.75)_inset] rounded-md p-1 max-h-60 overflow-y-auto">
                  {group.options.map(option => (
                    <div
                      key={option.value}
                      style={{ ...FONTS.para_02 }}
                      className={`p-2 m-1 cursor-pointer rounded-sm
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

      {/* Spacer to push filter controls to the right */}
      {!showFilters && <div className="flex-1"></div>}

      {/* Filter controls (always on the right) */}
      <div className="flex items-center">
        {hasActiveFilters && (
          <Button
            onClick={clearFilters}
            variant="ghost"
            className="mr-2 text-sm text-[#7B00FF] hover:text-[#B200FF]"
          >
            <X size={16} className="mr-1" />
            Clear Filters
          </Button>
        )}
        <img
          src={filterImg}
          alt="filter"
          className="cursor-pointer p-2 rounded-lg bg-[#ebeff3] 
          shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]"
          onClick={toggleFilters}
        />
      </div>
    </div>
  </Card>
</div>

      {/* Table Header */}
      <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white mx-2 p-4 mt-2">
        <table className="w-full">
          <thead>
            <tr className="flex justify-around items-center !text-white" style={{ ...FONTS.heading_03 }}>
              {headers.map((title, index) => (
                <th key={index}>{title}</th>
              ))}
            </tr>
          </thead>
        </table>
      </Card>

      {/* Filtered Data Cards */}
      {filteredData.length === 0 ? (
        <div className="text-center py-8">
          <Card className="p-6 bg-[#ebeff3] inline-block">
            <p style={{ ...FONTS.heading_04 }} className="text-gray-600">
              {hasActiveFilters 
                ? 'No classes match your filters'
                : 'No completed classes available'}
            </p>
            {hasActiveFilters && (
              <Button
                onClick={clearFilters}
                className="mt-4 bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white"
              >
                Clear Filters
              </Button>
            )}
          </Card>
        </div>
      ) : (
        <div className="space-y-2 mx-2 mt-2">
          {filteredData.map((item) => (
            <Card
              key={item.uuid}
              className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4
                transition-all duration-300 ease-in-out hover:-translate-y-1 
                hover:shadow-[6px_6px_8px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.8)] cursor-pointer"
            >
              <div className="flex justify-around items-center py-1" style={{ ...FONTS.heading_06 }}>
                <div>{item.courseDetails?.course_name || 'N/A'}</div>
                <div>{(item.start_date || '').slice(0, 10)}</div>
                <div>{(item.start_time || '').slice(11, 16)}</div>
                <div>{item.duration} Min</div>
                <div className="flex justify-center">
                  <Button
                    onClick={() => handleClassDetailPage(item.uuid)}
                    className="cursor-pointer bg-gradient-to-r from-green-400 to-green-500 text-white hover:from-green-500 hover:to-green-600
                      shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,
                      -4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),
                      8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),
                      -1px_-1px_6px_1px_rgba(255,255,255,0.25)]"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Completedclass;