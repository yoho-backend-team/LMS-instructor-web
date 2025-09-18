/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type JSXElementConstructor, type ReactElement, type ReactNode, type ReactPortal } from "react";
import { FONTS } from "@/constants/uiConstants";
import { Button } from "@/components/ui/button";
import type { Task } from "./TaskTable";
import { createTask, uploadquestionfile } from "@/features/Course/services/Course";
import { GetLocalStorage } from "@/utils/helper";

interface AddTaskFormProps {
  onSave: (task: Task) => void;
  onClose: () => void;
  course: any;
}

const AddTaskForm = ({ onSave, onClose, course }: AddTaskFormProps) => {
  const rawUser = GetLocalStorage("instructorDetails");
  const user = typeof rawUser === "string" ? JSON.parse(rawUser) : rawUser;

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    task: "",
    deadline: "",
    status: "pending",
    instructor: user?.full_name || "",
    taskName: "",
    question: "",
    score: "0",
    file: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.instructor.trim()) newErrors.instructor = "Instructor name is required";
    if (!formData.type.trim()) newErrors.type = "Type is required";
    if (!formData.taskName.trim()) newErrors.taskName = "Task name is required";
    if (!formData.task.trim()) newErrors.task = "Task description is required";
    if (!formData.deadline) newErrors.deadline = "Deadline is required";
    if (!formData.question.trim()) newErrors.question = "Question is required";

    if (formData.score && !/^\d+$/.test(formData.score)) {
      newErrors.score = "Score must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      let fileUrl: string | null = null;

      // Upload file first (if exists)
      if (formData.file) {
        try {
          const uploadFormData = new FormData();
          uploadFormData.append('file', formData.file);

          const uploadRes = await uploadquestionfile(uploadFormData);
          console.log(uploadRes, 'uploaded res')
          fileUrl = uploadRes?.data?.file;
          console.log("File uploaded:", fileUrl);
        } catch (uploadError) {
          console.error('File upload failed:', uploadError);
          alert('File upload failed. Creating task without attachment.');
        }
      }

      // Prepare task payload
      const taskPayload = {
        instructor: user?._id,
        task_type: formData.type.toLowerCase(),
        module: formData.task,
        task_name: formData.taskName,
        course: course?._id,
        deadline: new Date(formData.deadline).toISOString(),
        question: formData.question,
        status: "pending",
        score: "0",
        remark: "",
        question_file: fileUrl,
      };

      console.log("New Task Data:", taskPayload);

      // Call createTask API
      const res = await createTask(taskPayload, {});
      console.log("API response:", res?.data);

      // Create the task object for local state
      const newTask: Task = {
        id: res?.data?.data?._id || Date.now().toString(),
        name: formData.name || "Unnamed",
        type: formData.type,
        task: formData.task,
        deadline: formData.deadline,
        status: "pending",
        instructor: formData.instructor,
        taskName: formData.taskName,
        question: formData.question,
        score: "0",
        file: formData.file
      };

      onSave(newTask);
      alert("Success! Task added successfully!");
      onClose();

    } catch (err: any) {
      console.error('Task creation failed:', err);
      alert('Failed to create task');
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#f1f4f8] rounded-2xl shadow-xl w-full max-w-4xl mx-4 scrollbar-hide" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 style={{ ...FONTS.heading_02 }}>Add New Task</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              &times;
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Instructor Name Field */}
            <div>
              <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                Instructor Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                className={`p-3 rounded-lg w-full ${errors.instructor ? 'border border-red-500' : ''}`}
                style={{
                  ...FONTS.heading_06,
                  boxShadow: "rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset",
                }}
              />
              {errors.instructor && <p className="text-red-500 text-sm mt-1">{errors.instructor}</p>}
            </div>

            {/* Type Field */}
            <div>
              <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`p-3 rounded-lg w-full ${errors.type ? 'border border-red-500' : ''}`}
                style={{
                  ...FONTS.heading_06,
                  boxShadow: "rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset",
                }}
              >
                <option value="">Select type</option>
                <option value="Task">Task</option>
                <option value="Project">Project</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>

            {/* Task Name Field */}
            <div>
              <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                Task Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="taskName"
                value={formData.taskName}
                onChange={handleChange}
                placeholder="Enter task name"
                className={`p-3 rounded-lg w-full ${errors.taskName ? 'border border-red-500' : ''}`}
                style={{
                  ...FONTS.heading_06,
                  boxShadow: "rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset",
                }}
              />
              {errors.taskName && <p className="text-red-500 text-sm mt-1">{errors.taskName}</p>}
            </div>

            {/* Task Field */}
            <div>
              <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                Task <span className="text-red-500">*</span>
              </label>
              <select
                name="task"
                value={formData.task}
                onChange={handleChange}
                className={`p-3 rounded-lg w-full ${errors.task ? 'border border-red-500' : ''}`}
                style={{
                  ...FONTS.heading_06,
                  boxShadow: "rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset",
                }}
              >
                <option value="">Select a task</option>
                {(course?.coursemodules)?.map((item: { _id: string | number | readonly string[] | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: any) => (
                  <option key={item._id || index} value={item._id}>
                    {item.title}
                  </option>
                ))}
              </select>
              {errors.task && <p className="text-red-500 text-sm mt-1">{errors.task}</p>}
            </div>

            {/* Deadline Field */}
            <div>
              <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className={`p-3 rounded-lg w-full ${errors.deadline ? 'border border-red-500' : ''}`}
                style={{
                  ...FONTS.heading_06,
                  boxShadow: "rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset",
                }}
              />
              {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
            </div>

            {/* Question Field */}
            <div className="col-span-2">
              <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                Question <span className="text-red-500">*</span>
              </label>
              <textarea
                name="question"
                value={formData.question}
                onChange={handleChange}
                placeholder="Enter question"
                rows={4}
                className={`p-3 rounded-lg w-full ${errors.question ? 'border border-red-500' : ''}`}
                style={{
                  ...FONTS.heading_06,
                  boxShadow: "rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset",
                }}
              />
              {errors.question && <p className="text-red-500 text-sm mt-1">{errors.question}</p>}
            </div>

            {/* File Upload Field */}
            <div className="col-span-2">
              <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                Question Paper
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className="p-2 border cursor-pointer rounded-xl bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgaba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]"
                  style={{ ...FONTS.heading_06 }}
                >
                  Upload File
                </label>
                <span style={{ ...FONTS.heading_06 }}>
                  {formData.file ? formData.file.name : "No file chosen"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6 p-3 rounded-lg w-full bg-gray-10">
            <Button variant="outline" onClick={onClose} style={{
              ...FONTS.heading_06,
              cursor: "pointer",
              boxShadow: "rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset",
            }}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="cursor-pointer bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;