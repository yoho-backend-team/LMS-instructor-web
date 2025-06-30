import React from 'react'
import Add_Notes from './Add_notes';
import NotesMaterials from './notes__materials';
import CourseButton from './button';
import { Button } from '../ui/button';
import navigationicon from '../../assets/courses icons/navigation arrow.svg';

function CourseNotes() {
  return (
    <>
    <div className="flex items-center gap-3 mb-6">
            <Button
              onClick={() => navigate(-1)}
              className="bg-[#EBEFF3] text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
            >
              <img src={navigationicon} />
            </Button>
            <h1 className="text-black text-2xl font-semibold ">note & materials</h1>
          </div>

      {/* <h1 className="text-black text-4xl font-semibold "> note & materials</h1> */}
      <CourseButton activeTabs='notes' />
      <h1 className="text-black text-4xl font-semibold ">Add notes & materials</h1>
      <div className="grid grid-cols-2 w-full px-0 mx-0">

        <Add_Notes />
        <NotesMaterials />
      </div>
    </>
  )
}

export default CourseNotes