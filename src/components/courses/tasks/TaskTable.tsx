import { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FONTS, COLORS } from "@/constants/uiConstants";
import navigationicon from "../../../assets/courses icons/navigation arrow.svg";
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
  question_file?: any;
  is_active?: boolean;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, _setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const navigate = useNavigate();

  // Filter tasks based on search term and filters
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.task.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && task.is_active === true) ||
        (statusFilter === "inactive" && task.is_active === false);

      const matchesType =
        typeFilter === "all" ||
        task.type.toLowerCase() === typeFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [tasks, searchTerm, statusFilter, typeFilter]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter]);

  const handleRowClick = (task: Task) => {
    setSelectedTask(task);
    setShowEditForm(true);
  };

  const handleNewTask = () => {
    setSelectedTask(null);
    setShowAddForm(true);
  };

  const handleAddTask = (newTask: Task) => {
    const updatedTasks = [
      ...tasks,
      { ...newTask, id: Date?.now()?.toString() },
    ];
    onTaskUpdate(updatedTasks);
    setShowAddForm(false);
  };

  const handleEditTask = (updatedTask: Task) => {
    const updatedTasks = tasks?.map((task) =>
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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxPagesToShow / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  console.log(tasks, "tasksss");

  return (
    <div className="w-full mx-auto p-4">
      {/* Top Navigation & Title */}
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => navigate("/courses")}
          className="bg-[#EBEFF3] text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
        >
          <img src={navigationicon} alt="Navigation" />
        </Button>
        <h1 style={{ ...FONTS?.heading_02 }}>Task & Projects</h1>
      </div>

      {/* Course Button Tabs */}
      <CourseButton activeTabs="task" />

      {/* Filters and Add Task Button */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Type Filter */}
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="task">Task</SelectItem>
              <SelectItem value="project">Project</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Completed</SelectItem>
              <SelectItem value="inactive">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* + Add Task Button */}
        <Button
          style={{ ...FONTS?.heading_07 }}
          onClick={handleNewTask}
          className="bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white rounded-xl px-4 py-2 shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] w-full lg:w-auto"
        >
          + Add New Task
        </Button>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {indexOfFirstItem + 1}-
        {Math.min(indexOfLastItem, filteredTasks.length)} of{" "}
        {filteredTasks.length} tasks
        {(searchTerm || statusFilter !== "all" || typeFilter !== "all") &&
          " (filtered)"}
      </div>

      {/* Desktop Table View (hidden on mobile) */}
      <div className="hidden md:block">
        <Card className="overflow-hidden bg-[#EBEFF3] rounded-xl shadow-inner">
          <div className="flex flex-col">
            {/* Header Row */}
            <Card className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white p-4 mx-4 rounded-md sticky top-0 z-0 mb-4">
              <div className="grid grid-cols-5 gap-4 text-center !text-white">
                <div style={{ ...FONTS?.heading_02, color: COLORS?.white }}>
                  Name
                </div>
                <div style={{ ...FONTS?.heading_02, color: COLORS?.white }}>
                  Type
                </div>
                <div style={{ ...FONTS?.heading_02, color: COLORS?.white }}>
                  Task
                </div>
                <div style={{ ...FONTS?.heading_02, color: COLORS?.white }}>
                  Deadline
                </div>
                <div style={{ ...FONTS?.heading_02, color: COLORS?.white }}>
                  Status
                </div>
              </div>
            </Card>

            {/* Task Rows */}
            <div className="overflow-y-auto mx-4">
              {currentItems.length === 0 ? (
                <div className="flex justify-center mt-3 py-8">
                  <p style={{ ...FONTS?.heading_06 }} className="text-gray-500">
                    {filteredTasks.length === 0
                      ? "No tasks available"
                      : "No tasks match your filters"}
                  </p>
                </div>
              ) : (
                currentItems.map((task: any) => (
                  <Card
                    key={task?.id}
                    onClick={() => handleRowClick(task)}
                    className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4 mb-2 hover:shadow-md rounded-lg cursor-pointer transition-shadow duration-200"
                  >
                    <div className="grid grid-cols-5 gap-4 text-center items-center">
                      <div
                        style={{ ...FONTS?.para_01 }}
                        className="truncate"
                        title={task?.name}
                      >
                        {task?.name}
                      </div>
                      <div style={{ ...FONTS?.para_01 }} className="capitalize">
                        {task?.type}
                      </div>
                      <div
                        style={{ ...FONTS?.para_01 }}
                        className="truncate"
                        title={task?.task}
                      >
                        {task?.task}
                      </div>
                      <div style={{ ...FONTS?.para_01 }}>{task?.deadline}</div>
                      <div>
                        <Button
                          className={`cursor-pointer px-4 py-1 w-25 rounded-lg text-sm font-medium ${
                            task?.is_active === true
                              ? "bg-green-500 text-white hover:bg-green-600"
                              : "bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white hover:from-[#6A00E0] hover:to-[#9B00E0]"
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
      </div>

      {/* Mobile Card View (shown on mobile) */}
      <div className="block md:hidden">
        <div className="space-y-4">
          {currentItems.length === 0 ? (
            <div className="flex justify-center py-8">
              <p style={{ ...FONTS?.heading_06 }} className="text-gray-500">
                {filteredTasks.length === 0
                  ? "No tasks available"
                  : "No tasks match your filters"}
              </p>
            </div>
          ) : (
            currentItems.map((task: any) => (
              <Card
                key={task?.id}
                onClick={() => handleRowClick(task)}
                className="bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4 hover:shadow-md rounded-lg cursor-pointer transition-shadow duration-200"
              >
                <div className="space-y-3">
                  {/* Name */}
                  <div className="flex justify-between items-start">
                    <div style={{ ...FONTS?.para_01 }} className="font-semibold text-gray-700">
                      Name:
                    </div>
                    <div
                      style={{ ...FONTS?.para_01 }}
                      className="text-right truncate flex-1 ml-2"
                      title={task?.name}
                    >
                      {task?.name}
                    </div>
                  </div>

                  {/* Type */}
                  <div className="flex justify-between items-start">
                    <div style={{ ...FONTS?.para_01 }} className="font-semibold text-gray-700">
                      Type:
                    </div>
                    <div style={{ ...FONTS?.para_01 }} className="capitalize text-right">
                      {task?.type}
                    </div>
                  </div>

                  {/* Task */}
                  <div className="flex justify-between items-start">
                    <div style={{ ...FONTS?.para_01 }} className="font-semibold text-gray-700">
                      Task:
                    </div>
                    <div
                      style={{ ...FONTS?.para_01 }}
                      className="text-right truncate flex-1 ml-2"
                      title={task?.task}
                    >
                      {task?.task}
                    </div>
                  </div>

                  {/* Deadline */}
                  <div className="flex justify-between items-start">
                    <div style={{ ...FONTS?.para_01 }} className="font-semibold text-gray-700">
                      Deadline:
                    </div>
                    <div style={{ ...FONTS?.para_01 }} className="text-right">
                      {task?.deadline}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex justify-between items-center">
                    <div style={{ ...FONTS?.para_01 }} className="font-semibold text-gray-700">
                      Status:
                    </div>
                    <Button
                      className={`cursor-pointer px-4 py-1 rounded-lg text-sm font-medium ${
                        task?.is_active === true
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white hover:from-[#6A00E0] hover:to-[#9B00E0]"
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>

          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1"
            >
              Previous
            </Button>

            {/* Page Numbers */}
            <div className="flex gap-1">
              {getPageNumbers().map((pageNumber) => (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 min-w-[40px] ${
                    currentPage === pageNumber
                      ? "bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white"
                      : ""
                  }`}
                >
                  {pageNumber}
                </Button>
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1"
            >
              Next
            </Button>
          </div>

          {/* Items per page selector (duplicate for bottom) */}
          <Select
            value={itemsPerPage.toString()}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 per page</SelectItem>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

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