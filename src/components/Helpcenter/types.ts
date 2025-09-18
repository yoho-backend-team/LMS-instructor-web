/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";

export interface Tab {
  id: string;
  label: string;
  count: number;
  active?: boolean;
  category: string;
}

export interface HelpTopic {
  count: ReactNode;
  title?: string;
  category?: string;
  description?: string;
  HelpDetails?: any[];
}

export interface HelpCenterTabsProps {
  tabs: HelpTopic[] | any[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export interface HelpCenterSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export interface HelpTopicCardProps {
  topic: HelpTopic;
  onViewDetails?: (videoLink: any) => void;
  showViewButton?: boolean;
}

export interface LearningResourcesProps {
  onBack: () => void;
  data: any
}



export interface HelpCenterTab {
  category: string;
  count: number;
}


