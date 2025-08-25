
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import pdfimage from '../../assets/icons/notes/image 59.png'
import downloadimg from '../../assets/icons/notes/Download.png'
import { FONTS } from '@/constants/uiConstants';

const NotesMaterials = () => {

  const notesData = [
    { date: '12-06-2025', time: '09.00 AM' },
    { date: '13-06-2025', time: '10.00 AM' },
    { date: '14-06-2025', time: '11.00 AM' },
    { date: '15-06-2025', time: '09.30 AM' },
    { date: '16-06-2025', time: '10.30 AM' },
    { date: '17-06-2025', time: '08.00 AM' },
    { date: '18-06-2025', time: '09.00 AM' },
    { date: '19-06-2025', time: '10.00 AM' },
    { date: '20-06-2025', time: '11.00 AM' },
    { date: '21-06-2025', time: '09.30 AM' },
  ]

  return (
    <div className="w-full mx-auto p-4">
      <Card className="overflow-hidden">
        <div className="flex flex-col">
          <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white p-6 sticky top-0 z-10 ml-4 mr-4 mb-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>File</div>
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>Name</div>
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>Chapter</div>
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>PDF Download</div>
            </div>
          </Card>

          <div className="max-h-[500px] overflow-y-auto mx-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100" style={{ scrollbarWidth: "none" }}>
            {notesData.map((note, index) => (
              <Card
                key={index}
                className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4 mb-2 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="flex justify-center">
                    <img src={pdfimage} className="w-10 h-12" alt="PDF icon" />
                  </div>
                  <div className="text-center !text-gray-600" style={{ ...FONTS.para_01 }}>{note.date}</div>
                  <div className="text-center !text-gray-600" >{note.time}</div>
                  <div className="flex justify-center">
                    <Button
                      className="bg-[#EBEFF3] w-20 h-14 hover:bg-[#EBEFF3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]"
                      variant="outline"
                    >
                      <img src={downloadimg} className="w-8 h-10" alt="Download" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default NotesMaterials