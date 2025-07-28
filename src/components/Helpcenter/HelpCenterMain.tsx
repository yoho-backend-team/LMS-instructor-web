import React, { useEffect, useState } from 'react';
import { FONTS, COLORS } from '@/constants/uiConstants';
import HelpCenterTabs from './HelpCenterTabs.tsx';
import HelpCenterSearch from './HelpCenterSearch.tsx';
import HelpTopicCard from './HelpTopicCard.tsx';
import LearningResources from './LearningResources.tsx';
import HelpCenterEmptyState from './HelpCenterEmptyState.tsx';
import type { Tab, HelpTopic } from './types.ts';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentProfileThunk } from '@/features/Profile/reducers/thunks.ts';
import { selectHelpCenter } from '@/features/helpcenter/reduces/selectors.ts';
import { getHelpThunk } from '@/features/helpcenter/reduces/thunks.ts';


const HelpCenterMain: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [currentView, setCurrentView] = useState('main'); // 'main', 'learning'
  const [searchQuery, setSearchQuery] = useState('');
  const [vedioData, setvedioData] = useState(null);

  const dispatch = useDispatch<any>();
  const HelpDetails = useSelector(selectHelpCenter)
  const userDetail = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    dispatch(getStudentProfileThunk({}));
    dispatch(getHelpThunk({ instituteid: userDetail?.institute_id?.uuid }));
  }, [dispatch]);
  
  console.log(HelpDetails, "Help MAin")
  // const tabs: Tab[] = [
  //   { id: 'All', label: 'All', count: 5 },
  //   { id: 'Profile', label: 'Profile', count: 5 },
  //   { id: 'Classes', label: 'Classes', count: 5 },
  //   { id: 'Password', label: 'Password', count: 5 },
  //   { id: 'Attendance', label: 'Attendance', count: 0 },
  //   { id: 'Payment', label: 'Payment', count: 5 },
  //   { id: 'Login & Sign Up', label: 'Login & Sign Up', count: 0 },
  // ];

  // Common help topics for all tabs - ready for API integration
  const getHelpTopics = (category: string): { data: HelpTopic[], categorys: HelpTopic[] } => {
    // Return empty array for certain categories to demonstrate empty state

    // Map HelpDetails to HelpTopic objects
    const helpDetailTopics: HelpTopic[] = Array.isArray(HelpDetails)
      ? HelpDetails?.map((item: any) => ({
        title: item.question,
        category: item.category,
        description: item.answer,
        video: item.videolink
      }))
      : [];

    const categorys = helpDetailTopics?.filter((item, index) => item?.category !== helpDetailTopics[index + 1]?.category)
    // setcategoryList(categorys)


    let filterdata;
    if (activeTab == 'All') {
      filterdata = helpDetailTopics
    } else {
      filterdata = helpDetailTopics?.filter(item => item.category == category)
    }

    return {
      data: [
        ...filterdata
      ],
      categorys
    };
  };


  const getCurrentTopics = (): { data: HelpTopic[], categorys: HelpTopic[] } => {
    // Get topics for current active tab - all tabs now have the same topics with different categories
    const { data, categorys } = getHelpTopics(activeTab);

    // Filter topics based on search query
    if (searchQuery.trim()) {
      return {
        data: data?.filter(topic =>
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (topic.category && topic.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (topic.description && topic.description.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
        categorys
      }
    }

    return { data, categorys };
  };

  const currentTopics = getCurrentTopics().data;
  const categoryList = getCurrentTopics().categorys;
  const topicCount = currentTopics.length;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchQuery(''); // Reset search when changing tabs
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleViewDetails = (data: any) => {
    setCurrentView('learning');
    console.log(data, "set cheing")
    setvedioData(data)
  };

  const handleBackToMain = () => {
    setCurrentView('main');
  };

  if (currentView === 'learning') {
    return <LearningResources onBack={handleBackToMain} data={vedioData} />;
  }

  return (
    <div className="min-h-screen  py-4 sm:py-8">
      <div className="px-4 sm:px-6 max-w-7xl mx-auto">
        <h1
          className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl"
          style={{
            ...FONTS.heading_01,
            color: COLORS.text_title,
          }}
        >
          Help Centre
        </h1>

        {/* Main Content Card */}
        <div
          className="relative bg-[#ebeff3] p-4 sm:p-6 rounded-lg mb-4 sm:mb-6"
          style={{
            boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px, 
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
          }}
        >
          {/* Tabs */}
          <HelpCenterTabs
            tabs={categoryList}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />

          {/* Search */}
          <HelpCenterSearch
            onSearch={handleSearch}
            placeholder="Search help topics..."
          />

          {/* Help Topics Count */}
          <p
            className="mb-4 text-sm sm:text-base"
            style={{
              ...FONTS.heading_06,
              color: COLORS.text_desc,
            }}
          >
            {topicCount} Help Topics Available in {activeTab}
          </p>
        </div>

        {/* Help Centre Content */}
        <div
          className="relative bg-[#ebeff3] p-4 sm:p-6 rounded-lg"
          style={{
            boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px, 
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
          }}
        >
          <h2
            className="mb-4 sm:mb-6 text-xl sm:text-2xl lg:text-3xl"
            style={{
              ...FONTS.heading_02,
              color: COLORS.text_title,
            }}
          >
            Help Centre
          </h2>

          {currentTopics.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {currentTopics.map((topic, index) => (
                <HelpTopicCard
                  key={index}
                  topic={topic}
                  onViewDetails={handleViewDetails}
                  showViewButton={true}
                />
              ))}
            </div>
          ) : (
            <HelpCenterEmptyState
              searchQuery={searchQuery}
              activeTab={activeTab}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpCenterMain;