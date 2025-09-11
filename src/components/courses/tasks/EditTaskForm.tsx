/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { FONTS } from "@/constants/uiConstants";
import { Button } from "@/components/ui/button";
import type { Task } from "./TaskTable";

interface EditTaskFormProps {
  task: Task;
  onSave: (task: Task) => void;
  onClose: () => void;
}

interface StudentSubmission {
  _id: string;
  student: string;
  studentName?: string;
  file: string | null;
  status: string;
  mark: number;
  remark: string;
  completed_at: string;
  createdAt: string;
  updatedAt: string;
}

const EditTaskForm = ({ task, onSave, onClose }: EditTaskFormProps) => {
  const [activeTab, setActiveTab] = useState("taskDetails");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  console.log("Task answers:", task.answers);

  // Extract student submissions from task data
  const studentSubmissions: StudentSubmission[] | any = task?.answers;

  // Calculate pagination
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = studentSubmissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(studentSubmissions?.length / itemsPerPage);

  // State for student grades and remarks
  const [studentGrades, setStudentGrades] = useState<Record<string, { mark: string, remark: string, status: string }>>(
    studentSubmissions?.reduce((acc: any, submission: any) => {
      acc[submission?._id] = {
        mark: submission.mark?.toString() || "0",
        remark: submission?.remark || "",
        status: submission?.status || "pending"
      };
      return acc;
    }, {} as Record<string, { mark: string, remark: string, status: string }>)
  );

  const [showQuestionView, setShowQuestionView] = useState(false);
  const [showAttachmentView, setShowAttachmentView] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<StudentSubmission | null>(null);
  const [allStudentsCompleted, setAllStudentsCompleted] = useState(false);

  // Check if all students are completed
  useEffect(() => {
    const allCompleted = studentSubmissions?.every((submission: any) => {
      const grade = studentGrades[submission?._id];
      return grade?.status === "completed";
    });
    setAllStudentsCompleted(allCompleted);
  }, [studentGrades, studentSubmissions]);

  const handleGradeChange = (submissionId: string, field: string, value: string) => {
    const updatedGrades = {
      ...studentGrades,
      [submissionId]: {
        ...studentGrades[submissionId],
        [field]: value
      }
    };

    setStudentGrades(updatedGrades);

    // If status is being changed to "completed", update the individual submission immediately
    if (field === "status" && value === "completed") {
      const submission = studentSubmissions.find((sub: any) => sub?._id === submissionId);
      if (submission) {
        const grade = updatedGrades[submissionId];
        const updatedSubmission = {
          ...submission,
          mark: grade ? parseInt(grade.mark) || 0 : submission?.mark,
          remark: grade?.remark || submission?.remark,
          status: "completed"
        };

        console.log("Updated individual submission:", updatedSubmission);

        // Update the task with this single submission change
        const updatedSubmissions = studentSubmissions?.map((sub: any) =>
          sub?._id === submissionId ? updatedSubmission : sub
        );

        const updatedTask: Task = {
          ...task,
          answers: updatedSubmissions,
          // Don't change main status yet - only when all are completed and Update All is clicked
          status: task?.status
        };

        onSave(updatedTask);
      }
    }
  };

  const handleSubmit = () => {
    // Update all student submissions with new grades
    const updatedSubmissions = studentSubmissions?.map((submission: any) => {
      const grade = studentGrades[submission?._id];
      return {
        ...submission,
        mark: grade ? parseInt(grade.mark) || 0 : submission?.mark,
        remark: grade?.remark || submission?.remark,
        status: grade?.status || submission?.status
      };
    });

    console.log("All updated submissions:", updatedSubmissions);

    // Check if all students have been graded as completed
    const allGraded = updatedSubmissions.every((sub: any) => sub?.status === "completed");

    const updatedTask: Task = {
      ...task,
      answers: updatedSubmissions,
      // Only change main task status if all students are completed
      status: allGraded ? "completed" : task?.status
    };

    console.log("Final updated task with main status:", updatedTask);

    onSave(updatedTask);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleViewAttachment = (submission: StudentSubmission) => {
    setSelectedSubmission(submission);
    setShowAttachmentView(true);
  };

  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#f1f4f8] rounded-2xl shadow-xl w-full max-w-6xl mx-4 scrollbar-hide" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 style={{ ...FONTS.heading_02 }}>Task Details & Grading</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
                &times;
              </button>
            </div>

            {/* Status Indicator */}
            <div className="mb-4 p-3 rounded-lg bg-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ ...FONTS.heading_06 }} className="font-semibold">
                    Current Task Status: <span className={task.status === "completed" ? "text-green-600" : "text-yellow-600"}>{task.status}</span>
                  </p>
                  <p style={{ ...FONTS.para_01 }} className="text-sm text-gray-600 mt-1">
                    {allStudentsCompleted
                      ? "All students have been marked as completed. Click 'Update All Grades' to finalize and update main status."
                      : "Update individual student statuses. Main task status will update to 'completed' only when all students are marked as completed and you click 'Update All Grades'."}
                  </p>
                </div>
                {allStudentsCompleted && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Ready to Complete Task
                  </div>
                )}
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex mb-6 border-b">
              <button
                className={`px-4 py-2 ${activeTab === "taskDetails" ? "border-b-2 border-purple-500 text-purple-500" : "text-gray-500"}`}
                onClick={() => setActiveTab("taskDetails")}
                style={{ ...FONTS.heading_05 }}
              >
                Task Details
              </button>
              <button
                className={`px-4 py-2 ${activeTab === "studentSubmissions" ? "border-b-2 border-purple-500 text-purple-500" : "text-gray-500"}`}
                onClick={() => setActiveTab("studentSubmissions")}
                style={{ ...FONTS.heading_05 }}
              >
                Student Submissions ({studentSubmissions.length})
              </button>
            </div>

            {activeTab === "taskDetails" ? (
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
                  <input
                    type="text"
                    value={task.status}
                    className="p-3 rounded-lg w-full bg-gray-100"
                    style={{ ...FONTS.heading_06 }}
                    readOnly
                  />
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
              </div>
            ) : (
              <div className="overflow-x-auto">
                {studentSubmissions?.length > 0 ? (
                  <>
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                      <thead className="bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white">
                        <tr>
                          <th className="px-4 py-3 text-left" style={{ ...FONTS.heading_06 }}>Student ID</th>
                          <th className="px-4 py-3 text-left" style={{ ...FONTS.heading_06 }}>Status</th>
                          <th className="px-4 py-3 text-left" style={{ ...FONTS.heading_06 }}>Mark</th>
                          <th className="px-4 py-3 text-left" style={{ ...FONTS.heading_06 }}>Remark</th>
                          <th className="px-4 py-3 text-left" style={{ ...FONTS.heading_06 }}>Submitted On</th>
                          <th className="px-4 py-3 text-left" style={{ ...FONTS.heading_06 }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentSubmissions?.map((submission: any, index: number) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3" style={{ ...FONTS.para_01 }}>
                              {submission?.student?.first_name}
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={studentGrades[submission?._id]?.status || submission?.status}
                                onChange={(e) => handleGradeChange(submission?._id, "status", e.target.value)}
                                className="p-2 border rounded w-full"
                                style={{ ...FONTS.para_01 }}
                              >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                              </select>
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                value={studentGrades[submission?._id]?.mark || submission?.mark?.toString()}
                                onChange={(e) => handleGradeChange(submission?._id, "mark", e.target.value)}
                                min="0"
                                max="100"
                                className="p-2 border rounded w-full"
                                style={{ ...FONTS.para_01 }}
                              />
                            </td>
                            <td className="px-4 py-3">
                              <textarea
                                value={studentGrades[submission._id]?.remark || submission?.remark}
                                onChange={(e) => handleGradeChange(submission?._id, "remark", e.target.value)}
                                rows={2}
                                className="p-2 border rounded w-full"
                                style={{ ...FONTS.para_01 }}
                                placeholder="Enter remarks"
                              />
                            </td>
                            <td className="px-4 py-3" style={{ ...FONTS.para_01 }}>
                              {new Date(submission?.completed_at).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <Button
                                onClick={() => handleViewAttachment(submission)}
                                className="cursor-pointer bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white"
                                size="sm"
                              >
                                View Attachment
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center mt-4">
                        <nav className="flex items-center space-x-2">
                          <button
                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
                          >
                            Previous
                          </button>

                          {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) => (
                            <button
                              key={page}
                              onClick={() => paginate(page)}
                              className={`px-3 py-1 rounded-md ${currentPage === page
                                ? "bg-purple-600 text-white"
                                : "bg-gray-200"
                                }`}
                            >
                              {page}
                            </button>
                          ))}

                          <button
                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-md bg-gray-200 disabled:opacity-50"
                          >
                            Next
                          </button>
                        </nav>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p style={{ ...FONTS.heading_06 }}>No student submissions yet</p>
                  </div>
                )}
              </div>
            )}

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
                disabled={!allStudentsCompleted}
              >
                {allStudentsCompleted ? "Complete Task & Update All Grades" : "Update All Grades"}
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
      {showAttachmentView && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 style={{ ...FONTS.heading_03 }}>Student Attachment</h3>
              <button onClick={() => setShowAttachmentView(false)} className="text-gray-500 text-2xl">
                &times;
              </button>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg text-center">
              {selectedSubmission.file ? (
                <>
                  <p style={{ ...FONTS.heading_06 }} className="mb-4">
                    Student has submitted a file
                  </p>
                  <Button className="bg-blue-500 text-white">Download Attachment</Button>
                </>
              ) : (
                <p style={{ ...FONTS.heading_06 }} className="mb-4">
                  No attachment available for this submission
                </p>
              )}
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