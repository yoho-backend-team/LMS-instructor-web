// import React from 'react';
// import { Button } from "@/components/ui/button"
// import download from "../../assets/courses icons/download.svg"

// const Notes_Materials = () => {
//     const materials = [
//         { file: "chapter_1.pdf", name: "React Basics", chapter: "Chapter 1", link: "#" },
//         { file: "chapter_2.pdf", name: "Component Lifecycle", chapter: "Chapter 2", link: "#" },
//         { file: "chapter_3.pdf", name: "State Management", chapter: "Chapter 3", link: "#" },
//         { file: "chapter_4.pdf", name: "Hooks Overview", chapter: "Chapter 4", link: "#" },
//     ];

//     return (
//         <div className="px-4 py-6 max-w-screen-lg mx-auto">
//             <h1 className="text-black text-2xl font-semibold mb-6">Class Notes & Materials</h1>


//             <div className="flex flex-row gap-3  mb-12">
//                 <Button className="bg-[#EBEFF3]" variant="outline">
//                     About
//                 </Button>
//                 <Button className="bg-[#7b00ff]" variant="outline">
//                     Class notes & materials
//                 </Button>
//                 <Button className="bg-[#EBEFF3]" variant="outline">
//                     Task & project
//                 </Button>
//                 <Button className="bg-[#EBEFF3]" variant="outline">
//                     Course Tracking
//                 </Button>
//             </div>

//             <div className=" bg-[#EBEFF3] text-[#444447] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6 rounded-lg">
//                 <div className="grid grid-cols-4 font-semibold text-white bg-[#7b00ff] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)] p-4 rounded-lg mb-4">
//                     <span>File</span>
//                     <span>Name</span>
//                     <span>Chapters</span>
//                     <span>PDF Download</span>
//                 </div>

//                 {materials.map((item, index) => (
//                     <div
//                         key={index}
//                         className="grid grid-cols-4 text-sm bg-[#EBEFF3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)] p-4 rounded-lg mb-4"
//                     >
//                         <span>{item.file}</span>
//                         <span>{item.name}</span>
//                         <span>{item.chapter}</span>
//                         <a
//                             href={item.link}
//                             className="text-blue-600 ml-10 hover:underline"
//                             download
//                         >

//                             <img src={download} alt="Three Box" className="h-5 w-5" />
//                         </a>

//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Notes_Materials;
