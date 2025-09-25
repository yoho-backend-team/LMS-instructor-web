import React, { useEffect, useState } from "react";
import { FONTS, COLORS } from "@/constants/uiConstants";
import HelpCenterTabs from "./HelpCenterTabs";
import HelpCenterSearch from "./HelpCenterSearch";
import HelpTopicCard from "./HelpTopicCard";
import LearningResources from "./LearningResources";
import HelpCenterEmptyState from "./HelpCenterEmptyState";
import type { HelpTopic, HelpCenterTab } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { getStudentProfileThunk } from "@/features/Profile/reducers/thunks";
import { selectHelpCenter } from "@/features/helpcenter/reduces/selectors";
import { getHelpThunk } from "@/features/helpcenter/reduces/thunks";
import { GetLocalStorage } from "@/utils/helper";

const HelpCenterMain: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [currentView, setCurrentView] = useState("main");
  const [searchQuery, setSearchQuery] = useState("");
  const [vedioData, setVedioData] = useState<HelpTopic | null>(null);

  const dispatch = useDispatch<any>();
  const HelpDetails = useSelector(selectHelpCenter);
  const instituteId: any = GetLocalStorage("instructorDetails");

  useEffect(() => {
    dispatch(getStudentProfileThunk());
    dispatch(getHelpThunk({ instituteid: instituteId?._id }));
  }, [dispatch]);

  // Map API data into HelpTopic structure
  const helpDetailTopics: HelpTopic[] = Array.isArray(HelpDetails?.data)
    ? HelpDetails.data.map((item: any) => ({
        title: item.title,
        category: item.module,
        description: item.description,
        video: null,
      }))
    : [];

  // Build category tabs with count
  const buildTabs = (): HelpCenterTab[] => {
    const categoryCount: Record<string, number> = {};
    helpDetailTopics.forEach((item) => {
      categoryCount[item.category] = (categoryCount[item.category] || 0) + 1;
    });

    return [
      { category: "All", count: helpDetailTopics.length },
      ...Object.keys(categoryCount).map((cat) => ({
        category: cat,
        count: categoryCount[cat],
      })),
    ];
  };

  const tabs = buildTabs();

  // Filter topics by tab and search
  const getCurrentTopics = (): HelpTopic[] => {
    let filtered = activeTab === "All"
      ? helpDetailTopics
      : helpDetailTopics.filter((item) => item.category === activeTab);

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (topic) =>
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (topic.category &&
            topic.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (topic.description &&
            topic.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  };

  const currentTopics = getCurrentTopics();
  const topicCount = currentTopics.length;

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchQuery("");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleViewDetails = (data: HelpTopic) => {
    setCurrentView("learning");
    setVedioData(data);
  };

  const handleBackToMain = () => {
    setCurrentView("main");
  };

  if (currentView === "learning" && vedioData) {
    return <LearningResources onBack={handleBackToMain} data={vedioData} />;
  }

  return (
    <div className="min-h-screen py-4 sm:py-8">
      <div className="px-4 sm:px-6 max-w-7xl mx-auto">
        <h1
          className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl"
          style={{
            ...FONTS.heading_01,
            color: COLORS.text_title,
          }}
        >
          Help Center
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
            tabs={tabs}
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
            Help Center
          </h2>

          {currentTopics?.length > 0 ? (
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
