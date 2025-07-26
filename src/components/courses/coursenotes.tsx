import { useState } from 'react';
import Add_Notes from './Add_notes';
import NotesMaterials from './notes__materials';
import CourseButton from './button';
import { Button } from '../ui/button';
import navigationicon from '../../assets/courses icons/navigation arrow.svg';
import studyIcon from '../../assets/courses icons/studyIcon.png';
import notesIcon from '../../assets/courses icons/notesIcon.png'; 
import { useNavigate } from 'react-router-dom';
import StudyMaterials from './studyMaterials';

function CourseNotes() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'notes' | 'study'>('notes');

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => navigate(-1)}
          className="bg-[#EBEFF3] text-[#333] hover:bg-[#e0e0e0] px-1 py-1 mt-5 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
        >
          <img src={navigationicon} />
        </Button>
        <h1 className="text-black text-2xl mt-5 font-semibold">Notes & Materials</h1>
      </div>

    
<div className="flex justify-end mb-4 absolute right-10 top-35">
  <div className="flex gap-6">
    <div
      onClick={() => setActiveTab('notes')}
      className={`flex flex-col items-center cursor-pointer ${activeTab === 'notes' ? 'text-[#B200FF]' : 'text-gray-500'}`}
    >
      <img src={notesIcon} className="w-5 h-5 mb-1" alt="Notes" />
      <span className="text-sm font-medium">Notes & Materials</span>
    </div>

    <div
      onClick={() => setActiveTab('study')}
      className={`flex flex-col items-center cursor-pointer ${activeTab === 'study' ? 'text-[#B200FF]' : 'text-gray-500'}`}
    >
      <img src={studyIcon} className="w-5 h-5 mb-1" alt="Study" />
      <span className="text-sm font-medium">Study Materials</span>
    </div>
  </div>
</div>


      {/* TABS DISPLAY */}
      {activeTab === 'notes' ? (
        <>
          <CourseButton activeTabs="notes" />
          <h1 className="text-black text-4xl font-semibold mb-4">Add Notes & Materials</h1>
          <div className="grid grid-cols-2 w-full px-0 mx-0">
            <Add_Notes />
            <NotesMaterials />
          </div>
        </>
      ) : (
        <>
          <CourseButton activeTabs="notes" />
          <h1 className="text-black text-4xl font-semibold mb-4">Study Materials</h1>
          <div className="grid grid-cols-2 w-full px-0 mx-0">
            <Add_Notes />
            <StudyMaterials />
          </div>
        </>
      )}
    </>
  );
}

export default CourseNotes;
