import { useState } from "react";
import { FONTS } from "@/constants/uiConstants";
import { Button } from "@/components/ui/button";
import type { Task } from "./TaskTable";


interface AddTaskFormProps {
  onSave: (task: Task) => void;
  onClose: () => void;
}

const AddTaskForm = ({ onSave, onClose }: AddTaskFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    task: "",
    deadline: "",
    status: "pending",
    instructor: "",
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

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const newTask: Task = {
      id: Date.now().toString(),
      name: formData.name || "Unnamed",
      type: formData.type,
      task: formData.task,
      deadline: formData.deadline,
      status: formData.status,
      instructor: formData.instructor,
      taskName: formData.taskName,
      question: formData.question,
      score: formData.score,
      file: formData.file
    };
    
    onSave(newTask);
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
            {[
              { label: "Instructor Name", name: "instructor", required: true },
              { label: "Type", name: "type", required: true },
              { label: "Task Name", name: "taskName", required: true },
              { label: "Task", name: "task", required: true },
              { label: "Deadline", name: "deadline", type: "date", required: true },
              { label: "Question", name: "question", required: true },
            ].map((field, i) => (
              <div key={i}>
                <label className="block mb-1" style={{ ...FONTS.heading_05 }}>
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={(formData as any)[field.name]}
                  onChange={handleChange}
                  className={`p-3 rounded-lg w-full ${errors[field.name] ? 'border border-red-500' : ''}`}
                  style={{
                    ...FONTS.heading_06,
                    boxShadow: "rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset",
                  }}
                />
                {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
              </div>
            ))}

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