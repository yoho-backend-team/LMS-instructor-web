/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTaskData } from "@/features/Course/reducers/thunks";
import { selectTasks } from "@/features/Course/reducers/selector";
import { formatDate } from "@/utils/helper";
import type { RootState } from "@/store/store";
import type { Task } from "./tasks/TaskTable";
import TaskTable from "./tasks/TaskTable";

const Taskprojects = () => {
  const dispatch = useDispatch<any>();
  const taskData = useSelector(selectTasks);
  const selectCourse: any = useSelector((state: RootState) => state?.CourseSlice?.courseData);
  const [tasks, setTasks] = useState<Task[]>([]);
 

  useEffect(() => {
    if (taskData) {
      const response:Task[] = taskData?.map((item: { id: any; _id: any; instructor: { full_name: any; }; task_type: any; module: any; deadline: string | Date; is_active: boolean; task_name: any; question: any; answers: any; question_file: any }) => ({
        id: item?.id || item?._id,
        name: item?.instructor?.full_name,
        _id:item?._id,
        type: item?.task_type,
        task: item?.module?.description || "No module specified",
        deadline: formatDate(item?.deadline),
        is_active: item?.is_active || false,
        instructor: item?.instructor?.full_name,
        taskName: item?.task_name,
        question: item?.question,
        score: "0",
        studentAttachmentName: "quiz_answers.pdf",
        remark: "",
        // Map answers from backend
        answers: item?.answers || [],
        question_file: item?.question_file,
        
      }));
      setTasks(response);
    }
  }, [taskData]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (selectCourse?._id) {
        await dispatch(
          getAllTaskData({
            course: selectCourse?._id,
          })
        );
      }
    };
    fetchTasks();
  }, [dispatch, selectCourse]);

  const handleTaskUpdate = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };

  return <div>
    <TaskTable tasks={tasks} onTaskUpdate={handleTaskUpdate} course={selectCourse} />;
  </div>
};

export default Taskprojects;