import React from 'react'
import Add_Notes from '../../components/courses/Add_notes';
import NotesMaterials from '../../components/courses/notes__materials';
import CourseButton from './button';

function coursenotes() {
  return (
    <>
      <h1 className="text-black text-4xl font-semibold "> note & materials</h1>  
    <CourseButton activeTabs='notes'/>
      <h1 className="text-black text-4xl font-semibold ">Add notes & materials</h1>  
    <div className="grid grid-cols-2 w-full px-0 mx-0"> 
 
  <Add_Notes/>
  <NotesMaterials/>
</div>
</>
  )
}

export default coursenotes