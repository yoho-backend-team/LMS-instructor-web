import { useState } from "react";
import type { Task } from "./tasks/TaskTable";
import TaskTable from "./tasks/TaskTable";


const Taskprojects = () => {
  const initialTasks: Task[] = [
    { 
      id: "1",
      name: "Raji sukla", 
      type: "task", 
      task: "Larum ipsum", 
      deadline: "26.08.2025", 
      status: "completed",
      instructor: "Dr. Smith",
      taskName: "Research Paper",
      question: "Analyze the impact of AI on education",
      score: "95",
      studentAttachmentName: "research_paper.pdf",
      remark: "Excellent work with thorough analysis"
    },
    { 
      id: "2",
      name: "thamo", 
      type: "task", 
      task: "Lorem ipsum", 
      deadline: "12-06-2025", 
      status: "pending",
      instructor: "Prof. Johnson",
      taskName: "Case Study",
      question: "Evaluate market trends in 2024",
      score: "",
      studentAttachmentName: "case_study.docx",
      remark: "Awaiting submission"
    },
    { 
      id: "3",
      name: "Dhinesh", 
      type: "project", 
      task: "Lorem ipsum", 
      deadline: "21-09-2025", 
      status: "pending",
      instructor: "Dr. Williams",
      taskName: "Final Project",
      question: "Develop a full-stack application",
      score: "",
      studentAttachmentName: "project_proposal.pdf",
      remark: "Project proposal approved"
    },
    { 
      id: "4",
      name: "M S Dhoni", 
      type: "task", 
      task: "Lorem ipsum", 
      deadline: "21-09-2025", 
      status: "completed",
      instructor: "Prof. Davis",
      taskName: "Quiz Assignment",
      question: "Answer all questions from chapter 5",
      score: "88",
      studentAttachmentName: "quiz_answers.pdf",
      remark: "Good effort but missed some key points"
    },
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleTaskUpdate = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };

  return <TaskTable tasks={tasks} onTaskUpdate={handleTaskUpdate} />;
};

export default Taskprojects;