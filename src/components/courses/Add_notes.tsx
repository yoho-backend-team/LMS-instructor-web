import React from "react";
import fileimg from '../../assets/courses icons/File.jpg'
// import uploadimg from '../../assets/courses icons/Upload.png'
const FileUploadDesign = () => {
  return (
    <div className="w-full h-[700px]  mx-auto p-6  bg-[#EBEFF3] shadow-lg   rounded-lg mt-22 shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6">
      {/* Heading Section */}
      <div className="mb-6 ">
         <h2 className="text-lg text-gray-800 mt-4 mb-1">Heading</h2>
      
         <input
                type="text"
                placeholder="Heading"
                className="w-full p-3 h-15 pl-10 bg-[#EBEFF3] border-2 border-[#F4F7F9] rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          shadow-inner hover:shadow-md transition-shadow btnshadow"
              />
        
        <h2 className="text-lg text-gray-800 mt-4 mb-1">Sub Line</h2>
      
          <input
                type="text"
                placeholder="Sub line"
                className="w-full p-3 h-15 pl-10 bg-[#EBEFF3] border-2 border-[#F4F7F9] rounded-lg 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                          shadow-inner hover:shadow-md transition-shadow btnshadow"
              />
      </div>

      {/* Upload Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mt-5">
          Upload Study Materials File
        </h3>
        
        {/* Drop Zone */}
        <div className="mt-10 border-2 border-dashed border-gray-300 rounded-lg  shadow-lg btnshadow p-10 text-center">
          <img src={fileimg} className="w-6 h-6 m-auto"/>
          <p className="text-gray-500">Drag & Drop File</p>
          <p className="text-sm text-gray-400 mt-2">or</p>
          <button className="text-gray-500 shadow-lg font-medium mt-2">Browser</button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mt-20">
        <button className="px-4 py-2 bg-[#EBEFF3] text-gray-500 shadow-lg rounded-md">
          Cancel
        </button>
        <button className="px-4 py-2 bg-[#EBEFF3] text-gray-500 shadow-lg rounded-md">
          Upload  
        </button>
      </div>
    </div>
  );
};

export default FileUploadDesign;