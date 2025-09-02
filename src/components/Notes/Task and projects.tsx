
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { FONTS } from '@/constants/uiConstants';

const Taskprojects = () => {

  const tasks = [
    { name: 'Raji sukla', task: 'Larum ipsum', deadline: '26.08.2025', status: 'completed' },
    { name: 'thamo', task: 'Lorem ipsum', deadline: '12-06-2025', status: 'pending' },
    { name: 'Dhinesh', task: 'Lorem ipsum', deadline: '21-09-2025', status: 'pending' },
    { name: 'M S Dhoni', task: 'Lorem ipsum', deadline: '21-09-2025', status: 'completed' },

  ]

  return (
    <div className="w-full mx-auto p-4">
      <Card className="overflow-hidden">

        <div className="flex flex-col">

          <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white p-6 ml-4 mr-4  sticky top-0 z-10 mb-4" style={{ scrollbarWidth: "none" }}>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>Name</div>
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>Task Name</div>
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>Deadline</div>
              <div className="text-center !text-white" style={{ ...FONTS.heading_02 }}>Status</div>
            </div>
          </Card>


          <div className="max-h-[500px] overflow-y-auto mx-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100 " style={{ scrollbarWidth: "none" }}>
            {tasks.map((task, index) => (
              <Card
                key={index}
                className="bg-[#ebeff3] h-26 shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4 mb-2  hover:shadow-lg"
              >
                <div className="grid grid-cols-4 gap-4 items-center">
                  <div className="text-center !text-gray-600" style={{ ...FONTS.para_01 }}>{task.name}</div>
                  <div className="text-center !text-gray-600" style={{ ...FONTS.para_01 }}>{task.task}</div>
                  <div className="text-center !text-gray-600" style={{ ...FONTS.para_01 }}>{task.deadline}</div>
                  <div className="flex justify-center">
                    <Button style={{ ...FONTS.para_01 }}
                      className={`${task.status === 'completed'
                          ? 'bg-gradient-to-r from-green-400 to-green-500 !text-white shadow-[0px_3px_4px_0px_rgba(255,255,255,0.75)_inset,3px_-3px_3px_0px_rgba(255,255,255,0.25)_inset,-4px_8px_23px_0px_#3ABE65_inset,-8px_-8px_12px_0px_#3ABE65_inset,2px_3px_3px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-1px_-1px_6px_0px_rgba(255,255,255,0.75),-1px_-1px_6px_1px_rgba(255,255,255,0.25)]'
                          : 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset]'
                        }`}
                      variant={task.status === 'pending' ? 'outline' : 'default'}
                    >
                      {task.status}
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

export default Taskprojects