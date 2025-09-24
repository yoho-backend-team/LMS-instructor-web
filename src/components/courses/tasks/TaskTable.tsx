/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FONTS, COLORS } from "@/constants/uiConstants";
import navigationicon from '../../../assets/courses icons/navigation arrow.svg';
import EditTaskForm from "./EditTaskForm";
import AddTaskForm from "./AddTaskForm";
import CourseButton from "../button";
import { useNavigate } from "react-router-dom";

export interface Task {
  _id?: string;
  id: string;
  name: string;
  type: string;
  task: string;
  deadline: string;
  status: string;
  instructor?: string;
  taskName?: string;
  question?: string;
  score?: string;
  studentAttachment?: File | null;
  studentAttachmentName?: string;
  remark?: string;
  file?: File | null;
  // Add answers field to match backend response
  answers?: Array<{
    _id: string;
    student: string;
    file: string | null;
    status: string;
    mark: number;
    remark: string;
    completed_at: string;
    createdAt: string;
    updatedAt: string;
  }>;
}

interface TaskTableProps {
  tasks: Task[];
  onTaskUpdate: (updatedTasks: Task[]) => void;
  course: any;
}

const TaskTable = ({ tasks, onTaskUpdate, course }: TaskTableProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const navigate = useNavigate();

  const handleRowClick = (task: Task) => {
    setSelectedTask(task);
    setShowEditForm(true);
  };

  const handleNewTask = () => {
    setSelectedTask(null);
    setShowAddForm(true);
  };

  const handleAddTask = (newTask: Task) => {
    const updatedTasks = [...tasks, { ...newTask, id: Date?.now()?.toString() }];
    onTaskUpdate(updatedTasks);
    setShowAddForm(false);
  };

  const handleEditTask = (updatedTask: Task) => {
    const updatedTasks = tasks?.map(task =>
      task?.id === updatedTask?.id ? updatedTask : task
    );
    onTaskUpdate(updatedTasks);
    setShowEditForm(false);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setSelectedTask(null);
  };

  console.log(tasks, 'tasksss')

  return (
    <div className='w-full mx-auto p-4'>
      {/* Top Navigation & Title */}
      <div className='flex items-center gap-3 mb-6'>
        <Button
          onClick={() => navigate('/courses')}
          className='bg-[#EBEFF3] text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
        >
          <img src={navigationicon} alt="Navigation" />
        </Button>
        <h1 style={{ ...FONTS?.heading_02 }}>Task & Projects</h1>
      </div>

      {/* Course Button Tabs */}
      <CourseButton activeTabs='task' />

      {/* + Add Task Button */}
      <div className="flex justify-end mb-4">
        <Button
          style={{ ...FONTS?.heading_07 }}
          onClick={handleNewTask}
          className="bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white rounded-xl px-4 py-2 shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]"
        >
          + Add New Task
        </Button>
      </div>

      {/* Task List Container */}
      <Card className='overflow-hidden bg-[#EBEFF3] rounded-xl shadow-inner'>
        <div className='flex flex-col'>
          {/* Header Row */}
          <Card className='bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white p-4 mx-4 rounded-md sticky top-0 z-10 mb-4'>
            <div className='grid grid-cols-5 gap-4 text-center !text-white'>
              <div style={{ ...FONTS?.heading_02, color: COLORS?.white }}>Name</div>
              <div style={{ ...FONTS?.heading_02, color: COLORS?.white }}>Type</div>
              <div style={{ ...FONTS?.heading_02, color: COLORS?.white }}>Task</div>
              <div style={{ ...FONTS?.heading_02, color: COLORS?.white }}>Deadline</div>
              <div style={{ ...FONTS?.heading_02, color: COLORS?.white }}>Status</div>
            </div>
          </Card>

          {/* Task Rows */}
          <div className='overflow-y-auto mx-4'>
            {tasks?.length === 0 ? (
              <div className='flex justify-center mt-3'>
                <p style={{ ...FONTS?.heading_06 }}>No tasks available</p>
              </div>
            ) : (
              tasks?.map((task: any) => (
                <Card
                  key={task?.id}
                  onClick={() => handleRowClick(task)}
                  className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4 mb-2 hover:shadow-md rounded-lg cursor-pointer'
                >
                  <div className='grid grid-cols-5 gap-4 text-center items-center'>
                    <div style={{ ...FONTS?.para_01 }}>{task?.name}</div>
                    <div style={{ ...FONTS?.para_01 }}>{task?.type}</div>
                    <div style={{ ...FONTS?.para_01 }}>{task?.task}</div>
                    <div style={{ ...FONTS?.para_01 }}>{task?.deadline}</div>
                    <div>
                      <Button
                        className={`cursor-pointer px-4 py-1 w-25 rounded-lg text-sm font-medium ${task?.is_active === true
                          ? "bg-green-500 text-white"
                          : "bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white"
                          }`}
                      >
                        {task?.is_active === true ? "Completed" : "Pending"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </Card>

      {/* Add Task Form */}
      {showAddForm && (
        <AddTaskForm
          onSave={handleAddTask}
          onClose={handleCloseForm}
          course={course}
        />
      )}

      {/* Edit Task Form */}
      {showEditForm && selectedTask && (
        <EditTaskForm
          task={selectedTask}
          onSave={handleEditTask}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default TaskTable;