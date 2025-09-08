import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FONTS, COLORS } from "@/constants/uiConstants";
import EditTaskForm from "./EditTaskForm";
import AddTaskForm from "./AddTaskForm";

export interface Task {
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
}

interface TaskTableProps {
  tasks: Task[];
  onTaskUpdate: (updatedTasks: Task[]) => void;
}

const TaskTable = ({ tasks, onTaskUpdate }: TaskTableProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleRowClick = (task: Task) => {
    setSelectedTask(task);
    setShowEditForm(true);
  };

  const handleNewTask = () => {
    setSelectedTask(null);
    setShowAddForm(true);
  };

  const handleAddTask = (newTask: Task) => {
    const updatedTasks = [...tasks, { ...newTask, id: Date.now().toString() }];
    onTaskUpdate(updatedTasks);
    setShowAddForm(false);
  };

  const handleEditTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    onTaskUpdate(updatedTasks);
    setShowEditForm(false);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setSelectedTask(null);
  };

  // Table headers
  const headers = ["Name", "Type", "Task", "Deadline", "Status"];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 style={{ ...FONTS.heading_01 }} className="my-4">
          Task & Projects
        </h1>
        <Button
          style={{ ...FONTS.heading_07 }}
          onClick={handleNewTask}
          className={
            "bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]"
          }
        >
          + Add New Task
        </Button>
      </div>

      <Card style={{ backgroundColor: COLORS.bg_Colour }}>
        {/* Table Header */}
        <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white mx-4 p-4">
          <table className="w-full">
            <thead>
              <tr
                className="flex justify-around items-center !text-white"
                style={{ ...FONTS.heading_03 }}
              >
                {headers.map((header, index) => (
                  <td key={index}>{header}</td>
                ))}
              </tr>
            </thead>
          </table>
        </Card>

        {/* No data */}
        {tasks.length === 0 ? (
          <p className="text-center text-gray-600 py-6" style={{ ...FONTS.heading_06 }}>
            No tasks available.
          </p>
        ) : (
          <>
            {tasks.map((task, index) => (
              <Card
                key={task.id}
                onClick={() => handleRowClick(task)}
                className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] 
                           text-black mx-4 p-4 transition-all duration-300 ease-in-out 
                           hover:-translate-y-1 
                           hover:shadow-[6px_6px_8px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.8)] 
                           cursor-pointer"
              >
                <table className="w-full">
                  <tbody>
                    <tr className="flex justify-around items-center" style={{ ...FONTS.heading_06 }}>
                      <td>{task.name}</td>
                      <td>{task.type}</td>
                      <td>{task.task}</td>
                      <td>{task.deadline}</td>
                      <td>
                        <Button
                          className={`cursor-pointer px-4 py-1 w-25 rounded-lg text-sm font-medium ${
                            task.status === "completed"
                              ? "bg-green-500 text-white"
                              : "cursor-pointer bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]"
                          }`}
                          variant="outline"
                        >
                          {task.status}
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Card>
            ))}
          </>
        )}
      </Card>

      {/* Add Task Form */}
      {showAddForm && (
        <AddTaskForm
          onSave={handleAddTask}
          onClose={handleCloseForm}
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