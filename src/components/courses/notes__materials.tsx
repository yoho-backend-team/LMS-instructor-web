/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import pdfimage from "../../assets/icons/notes/image 59.png";
import Edit from "../../assets/courses icons/Edit-alt.png";
import Trash from "../../assets/courses icons/Trash.png";
import { FONTS } from "@/constants/uiConstants";
import { useSelector } from "react-redux";
import { selectCoursedata } from "@/features/Course/reducers/selector";
import { GetImageUrl } from "@/utils/helper";
import { deleteNotes } from "@/features/Course/services/Course";
import { toast } from "react-toastify";

interface SelectedNotes {
  _id: string;
  title: string;
  description: string;
  file: any;
}

interface NotesMaterialsProps {
  setselectedNotes: (note: SelectedNotes) => void;
}

const NotesMaterials = ({ setselectedNotes }: NotesMaterialsProps) => {
  const courseSelectData = useSelector(selectCoursedata);

  const formattedDate = (date: any) => {
    const newDate = new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    return newDate;
  };

  const handleDeleteNotes = async (note: any) => {
    try {
      const response = await deleteNotes({
        noteId: note?.uuid,
      });

      if (response) {
        toast.success(`${note?.title} deleted`);
      } else {
        toast.error("Failed to delete the note, please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again.");
    }
  };

 
  const getFileTypeInfo = (fileName: string) => {
    const extension = fileName?.split('.').pop()?.toLowerCase() || '';
    const fileTypes: any = {
      'pdf': { color: 'from-[#7B00FF] to-[#B200FF]', label: 'PDF' },
      'doc': { color: 'from-green-500 to-green-600', label: 'DOC' },
      'docx': { color: 'from-green-500 to-green-600', label: 'DOC' },
      'txt': { color: 'from-gray-500 to-gray-600', label: 'TXT' },
      'jpg': { color: 'from-pink-500 to-pink-600', label: 'IMG' },
      'jpeg': { color: 'from-pink-500 to-pink-600', label: 'IMG' },
      'png': { color: 'from-pink-500 to-pink-600', label: 'IMG' }
    };
    
    return fileTypes[extension] || { color: 'from-gray-500 to-gray-600', label: 'FILE' };
  };

  return (
    <div className="w-full h-max mx-auto p-4 mt-6">
      <Card
        className="overflow-hidden bg-[#EBEFF3] h-[68vh]
			shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6"
      >
        <div className="flex flex-col">
        
          <Card className="hidden lg:block bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white p-6 sticky top-0 z-10 ml-4 mr-4 mb-4">
            <div className="grid grid-cols-4 gap-4">
              <div
                className="text-center !text-white"
                style={{ ...FONTS.heading_02 }}
              >
                File
              </div>
              <div
                className="text-center !text-white"
                style={{ ...FONTS.heading_02 }}
              >
                Name
              </div>
              <div
                className="text-center !text-white"
                style={{ ...FONTS.heading_02 }}
              >
                Date
              </div>
              <div
                className="text-center !text-white"
                style={{ ...FONTS.heading_02 }}
              >
                Actions
              </div>
            </div>
          </Card>

          
          <div className="block lg:hidden mb-4">
            <h3 className="text-lg font-semibold text-[#7B00FF] text-center" style={{ ...FONTS.heading_02 }}>
              Your Notes
            </h3>
          </div>

          <div
            className="max-h-[500px] overflow-y-auto mx-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100"
            style={{ scrollbarWidth: "none" }}
          >
            {courseSelectData?.notes?.length ? (
              courseSelectData?.notes?.map((note: any, index: any) => (
                <>
               
                  <div key={`mobile-${index}`} className="block lg:hidden mb-4">
                    <Card className="bg-white rounded-lg p-4 shadow-[3px_3px_5px_rgba(189,194,199,0.5),-2px_-2px_5px_rgba(255,255,255,0.8)] hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 bg-gradient-to-r ${getFileTypeInfo(note?.file).color} rounded-full flex items-center justify-center`}>
                              <span className="text-white text-xs font-bold">
                                {getFileTypeInfo(note?.file).label}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 truncate" style={{ ...FONTS.heading_07 }}>
                                {note?.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1">
                                Uploaded: {formattedDate(note?.updatedAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <a
                            href={GetImageUrl(note?.file) ?? undefined}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[#7B00FF] hover:text-[#B200FF]"
                          >
                            <img src={pdfimage} className="w-4 h-4" alt="Download" />
                            <span>Download</span>
                          </a>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            className="bg-[#EBEFF3] p-2 w-10 h-10 hover:bg-[#EBEFF3] shadow-[3px_3px_4px_rgba(189,194,199,0.5),inset_-1px_-1px_2px_rgba(255,255,255,0.8)] cursor-pointer"
                            variant="outline"
                            onClick={() => setselectedNotes(note)}
                          >
                            <img src={Edit} className="w-4 h-4" alt="Edit Button" />
                          </Button>
                          <Button
                            className="bg-[#EBEFF3] w-10 h-10 hover:bg-[#EBEFF3] shadow-[3px_3px_4px_rgba(189,194,199,0.5),inset_-1px_-1px_2px_rgba(255,255,255,0.8)] cursor-pointer"
                            variant="outline"
                            onClick={() => handleDeleteNotes(note)}
                          >
                            <img src={Trash} className="w-4 h-4" alt="Delete Button" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Card
                    key={`desktop-${index}`}
                    className="hidden lg:block bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4 mb-2 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="flex justify-center">
                        <a
                          href={GetImageUrl(note?.file) ?? undefined}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={pdfimage}
                            className="w-10 h-12 cursor-pointer"
                            alt="PDF icon"
                          />
                        </a>
                      </div>
                      <div
                        className="text-center !text-gray-600"
                        style={{ ...FONTS.heading_07 }}
                      >
                        {note?.title}
                      </div>
                      <div
                        className="text-center !text-gray-600"
                        style={{ ...FONTS.heading_07 }}
                      >
                        {formattedDate(note?.updatedAt)}
                      </div>
                      <div className="flex justify-center">
                        <Button
                          className="bg-[#EBEFF3] p-2 w-12 h-10 hover:bg-[#EBEFF3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] cursor-pointer"
                          variant="outline"
                          onClick={() => setselectedNotes(note)}
                        >
                          <img src={Edit} className="w-5 h-5" alt="Edit Button" />
                        </Button>

                        <Button
                          className="bg-[#EBEFF3] w-12 h-10 ml-2 hover:bg-[#EBEFF3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] cursor-pointer"
                          variant="outline"
                          onClick={() => handleDeleteNotes(note)}
                        >
                          <img
                            src={Trash}
                            className="w-5 h-5"
                            alt="Delete Button"
                          />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </>
              ))
            ) : (
              <div className="flex justify-center mt-3">
                <p style={{ ...FONTS.heading_06 }}>No notes available</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotesMaterials;