import React from 'react';
import { useNavigate } from 'react-router-dom';
import FAQContainer from './FAQContainer';
import FAQHeader from './FAQHeader';
import FAQSearch from './FAQSearch';
import FAQActions from './FAQActions';
import FAQList from './FAQList';
import FAQSupport from './FAQSupport';
import { useFAQ } from './useFAQ';
import type { FAQItem } from './types';
import { useSelector } from 'react-redux';

const FAQInterface: React.FC = () => {
  const navigate = useNavigate();

  const FaqData = useSelector((state: any) => state.faqSlice)

  const faqItems: FAQItem[] = FaqData?.data?.map((items: any) => (
    {
      id: items.title,
      question: items.title,
      content: items.description
    }
  ))

 // const faqItems: FAQItem[] = [
//     {
//       id: 'introduction',
//       question: 'Introduction',
//       content: `Thanks For Your Interest In Teaching Your Courses Through Payil.

// Payil Is Designed To Help You Manage Your Courses Effectively.

// You Can Track Student Progress And Manage Assignments Easily.`
//     },
//     {
//       id: 'access-payil',
//       question: 'How To Access Payil?',
//       content: `To access Payil, follow these simple steps:

// 1. Open your web browser and navigate to the Payil website
// 2. Click on the "Login" button in the top right corner
// 3. Enter your registered email address and password
// 4. Click "Sign In" to access your dashboard

// If you don't have an account yet, click on "Sign Up" to create a new account.`
//     },
//     {
//       id: 'dashboard',
//       question: 'About Payil Dashboard',
//       content: `The Payil Dashboard is your central hub for managing all your educational activities.

// Key features include:
// - Course overview and progress tracking
// - Assignment management
// - Student performance analytics
// - Communication tools
// - Resource library access

// The dashboard is designed to be intuitive and user-friendly, providing quick access to all essential features.`
//     },
//     {
//       id: 'courses',
//       question: 'About Payil Courses',
//       content: `Payil Courses offer a comprehensive learning experience with:

// - Interactive video lessons
// - Downloadable resources and materials
// - Progress tracking and assessments
// - Discussion forums for student interaction
// - Mobile-friendly access for learning on the go

// Each course is structured to provide maximum learning outcomes with engaging content and practical exercises.`
//     },
//     {
//       id: 'subject',
//       question: 'How To Access Payil Subject',
//       content: `To access subjects in Payil:

// 1. Log into your Payil account
// 2. Navigate to the "Courses" section from the main menu
// 3. Browse available subjects or use the search function
// 4. Click on the subject you want to access
// 5. Start learning with the available lessons and materials

// You can bookmark subjects for quick access later.`
//     },
//     {
//       id: 'add-course',
//       question: 'How To Add A New Course To The Dashboard?',
//       content: `Adding a new course to your dashboard is easy:

// For Students:
// 1. Go to the "Course Catalog" section
// 2. Browse or search for the course you want
// 3. Click "Enroll" on the course page
// 4. Complete the enrollment process
// 5. The course will appear on your dashboard

// For Instructors:
// 1. Access the "Create Course" section
// 2. Fill in course details and curriculum
// 3. Upload course materials
// 4. Set course settings and pricing
// 5. Publish the course to make it available to students`
//     }


 // ];

  const {
    expandedItems,
    searchQuery,
    filteredItems,
    toggleExpand,
    setSearchQuery,
    expandAll,
    collapseAll
  } = useFAQ(faqItems);

  const handleContactSupport = () => {
    // Navigate to tickets page
    navigate('/tickets');
  };

  return (
    <FAQContainer>
      <FAQHeader />
      <FAQSearch 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      <FAQActions
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
        totalItems={filteredItems.length}
        expandedCount={expandedItems.size}
      />
      <FAQList 
        items={filteredItems}
        expandedItems={expandedItems}
        onToggleItem={toggleExpand}
      />
      <FAQSupport onContactSupport={handleContactSupport} />
    </FAQContainer>
  );
};

export default FAQInterface;