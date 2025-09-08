import { useState } from "react";
import { FONTS } from "@/constants/uiConstants";
import { Button } from "@/components/ui/button";
import type { Task } from "./TaskTable";

interface EditTaskFormProps {
  task: Task;
  onSave: (task: Task) => void;
  onClose: () => void;
}

const EditTaskForm = ({ task, onSave, onClose }: EditTaskFormProps) => {
  const [formData, setFormData] = useState({
    score: task.score || "0",
    remark: task.remark || "",
    status: task.status,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showQuestionView, setShowQuestionView] = useState(false);
  const [showAttachmentView, setShowAttachmentView] = useState(false);

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.score && !/^\d+$/.test(formData.score)) {
      newErrors.score = "Score must be a number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    const updatedTask: Task = {
      ...task,
      score: formData.score,
      remark: formData.remark,
      status: formData.status
    };
    
    onSave(updatedTask);
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#f1f4f8] rounded-2xl shadow-xl w-full max-w-4xl mx-4 scrollbar-hide" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ ...FONTS.heading_02 }}>Task Details</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
                &times;
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-1" style={{ ...FONTS.heading_05 }}>Instructor Name</label>
                <input type="text" value={task.instructor || ""} className="p-3 rounded-lg w-full bg-gray-100" style={{ ...FONTS.heading_06 }} readOnly />
              </div>
              <div>
                <label className="block mb-1" style={{ ...FONTS.heading_05 }}>Type</label>
                <input type="text" value={task.type} className="p-3 rounded-lg w-full bg-gray-100" style={{ ...FONTS.heading_06 }} readOnly />
              </div>
              <div>
                <label className="block mb-1" style={{ ...FONTS.heading_05 }}>Task Name</label>
                <input type="text" value={task.taskName || ""} className="p-3 rounded-lg w-full bg-gray-100" style={{ ...FONTS.heading_06 }} readOnly />
              </div>
              <div>
                <label className="block mb-1" style={{ ...FONTS.heading_05 }}>Task</label>
                <input type="text" value={task.task} className="p-3 rounded-lg w-full bg-gray-100" style={{ ...FONTS.heading_06 }} readOnly />
              </div>
              <div>
                <label className="block mb-1" style={{ ...FONTS.heading_05 }}>Deadline</label>
                <input type="text" value={task.deadline} className="p-3 rounded-lg w-full bg-gray-100" style={{ ...FONTS.heading_06 }} readOnly />
              </div>
              <div>
                <label className="block mb-1" style={{ ...FONTS.heading_05 }}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="p-3 rounded-lg w-full bg-white"
                  style={{ ...FONTS.heading_06, boxShadow: "rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset" }}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block mb-1" style={{ ...FONTS.heading_05 }}>Question</label>
                <div className="flex items-center gap-2">
                  <input type="text" value={task.question || ""} className="p-3 rounded-lg w-full bg-gray-100" style={{ ...FONTS.heading_06 }} readOnly />
                  <Button
                    onClick={() => setShowQuestionView(true)}
                    className="cursor-pointer bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]"
                    size="sm"
                  >
                    View
                  </Button>
                </div>
              </div>
              <div>
                <label className="block mb-1" style={{ ...FONTS.heading_05 }}>Score</label>
                <input
                  type="text"
                  name="score"
                  value={formData.score}
                  onChange={handleChange}
                  className={`p-3 rounded-lg w-full bg-white ${errors.score ? 'border border-red-500' : ''}`}
                  style={{ ...FONTS.heading_06, boxShadow: "rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset" }}
                />
                {errors.score && <p className="text-red-500 text-sm mt-1">{errors.score}</p>}
              </div>
              <div className="col-span-2">
                <label className="block mb-1" style={{ ...FONTS.heading_05 }}>Student Attachment</label>
                <div className="flex items-center gap-2">
                  <input type="text" value={task.studentAttachmentName || "No attachment"} className="p-3 rounded-lg w-full bg-gray-100" style={{ ...FONTS.heading_06 }} readOnly />
                  <Button
                    onClick={() => setShowAttachmentView(true)}
                    className="cursor-pointer bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]"
                    size="sm"
                  >
                    View
                  </Button>
                </div>
              </div>
              <div className="col-span-2">
                <label className="block mb-1" style={{ ...FONTS.heading_05 }}>Remark</label>
                <textarea
                  name="remark"
                  value={formData.remark}
                  onChange={handleChange}
                  rows={3}
                  className="p-3 rounded-lg w-full bg-white"
                  style={{ ...FONTS.heading_06, boxShadow: "rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset" }}
                  placeholder="Enter your remarks here..."
                />
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
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Question View Modal */}
      {showQuestionView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 style={{ ...FONTS.heading_03 }}>Question</h3>
              <button onClick={() => setShowQuestionView(false)} className="text-gray-500 text-2xl">
                &times;
              </button>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p style={{ ...FONTS.heading_06 }}>{task.question}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setShowQuestionView(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Attachment View Modal */}
      {showAttachmentView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 style={{ ...FONTS.heading_03 }}>Student Attachment</h3>
              <button onClick={() => setShowAttachmentView(false)} className="text-gray-500 text-2xl">
                &times;
              </button>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg text-center">
              <p style={{ ...FONTS.heading_06 }} className="mb-4">
                {task.studentAttachmentName || "No attachment available"}
              </p>
              <Button className="bg-blue-500 text-white">Download Attachment</Button>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setShowAttachmentView(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTaskForm;