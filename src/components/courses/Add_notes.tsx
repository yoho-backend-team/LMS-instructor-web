import { useRef, useState } from 'react';
import fileimg from '../../assets/courses icons/File.jpg';
import { FONTS } from '@/constants/uiConstants';
import { toast } from 'react-toastify';
import { uploadticketfile } from '@/features/Tickets/services/Ticket';

const FileUploadDesign = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile,setSelectedFile] = useState<any>(null);
  	const [fileUrl, setFileUrl] = useState<string | null>(null);
	const [preview, setPreview] = useState<string | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    
        const allowedTypes = [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'image/jpg',
        ];
        if (!allowedTypes.includes(file.type)) {
          toast.error('Only PDF or image files (JPG, PNG) are allowed.');
          return;
        }

    if (file) {
      setSelectedFile(file)
      console.log('Selected file:', file);
      // Replace with your upload logic
      
      if (file.type.startsWith('image/')) {
              const imageUrl = URL.createObjectURL(file);
              setPreview(imageUrl);
            } else {
              setPreview(null);
            }
      
            const formData = new FormData();
            formData.append('file', file);
      
            const response = await uploadticketfile(formData);
            const uploadedPath = response?.data?.file;

            			if (!uploadedPath) {
                  throw new Error('Upload failed: No file path returned from server.');
                }
            setFileUrl(uploadedPath);
            toast.success('File uploaded successfully.'); 
    }
  };

  return (
    <div className="w-full h-[700px] mx-auto bg-[#EBEFF3] rounded-lg mt-22 shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Heading Section */}
      <div className="mb-6">
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
        <h3 className="text-lg font-medium text-gray-800 mt-5">Upload File</h3>

        {/* Drop Zone */}
        <div
          onClick={handleClick}
          className="mt-10 border-2 border-dashed border-gray-300 rounded-lg shadow-lg btnshadow p-10 text-center cursor-pointer"
        >
          <img src={fileimg} className="w-6 h-6 m-auto" />
          <p className="text-gray-500">Drag & Drop File</p>
          <p className="text-sm text-gray-400 mt-2">or</p>
          <button
            type="button"
            onClick={handleClick}
            className="text-gray-500 font-medium mt-2 shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]"
          >
            Browser
          </button>
          {
            selectedFile && 
          <div className='mt-5'>
            <p style={{...FONTS.para_03}}>{selectedFile?.name}</p>
          </div>
          }
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mt-20">
        <button className="px-4 py-2 bg-[#EBEFF3] text-gray-500 rounded-md btnshadow cursor-pointer">
          Cancel
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white rounded-md btnshadow cursor-pointer">
          Upload
        </button>
      </div>
    </div>
  );
};

export default FileUploadDesign;
