/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	useState,
	type JSXElementConstructor,
	type ReactElement,
	type ReactNode,
	type ReactPortal,
} from 'react';
import { FONTS } from '@/constants/uiConstants';
import { Button } from '@/components/ui/button';
import type { Task } from './TaskTable';
import {
	createTask,
	uploadquestionfile,
} from '@/features/Course/services/Course';
import { GetLocalStorage } from '@/utils/helper';
import { toast } from 'react-toastify';

interface AddTaskFormProps {
	onSave: (task: Task) => void;
	onClose: () => void;
	course: any;
}

const AddTaskForm = ({ onSave, onClose, course }: AddTaskFormProps) => {
	const rawUser = GetLocalStorage('instructorDetails');
	const user = typeof rawUser === 'string' ? JSON.parse(rawUser) : rawUser;

	const [formData, setFormData] = useState({
		name: '',
		type: '',
		task: '',
		deadline: '',
		status: 'pending',
		instructor: user?.full_name || '',
		taskName: '',
		question: '',
		score: '0',
		file: null as File | null,
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	// Validation functions
	const validateName = (name: string): boolean => {
		// Allow letters, spaces, hyphens, apostrophes, and periods
		// Must contain at least one letter and max 30 characters
		const trimmed = name.trim();
		if (!trimmed || trimmed.length > 30) return false;
		const nameRegex = /^(?=.*[a-zA-Z])[a-zA-Z\s\-'.]+$/;
		return nameRegex.test(trimmed);
	};

	const validateTaskName = (taskNameInput: unknown): boolean => {
		const taskName = String(taskNameInput ?? '').trim();
		if (!taskName || taskName.length > 30) return false;

		// ✅ Allow only these characters
		const allowedRegex = /^[a-zA-Z0-9\s\-_.,!?()]+$/;
		if (!allowedRegex.test(taskName)) return false;

		// ❌ Reject if fully numeric
		if (/^\d+$/.test(taskName)) return false;

		// ✅ Must contain at least one alphabet character
		if (!/[a-zA-Z]/.test(taskName)) return false;

		if (taskName.length < 2) return false;
		return true;
	};

	// Input handler with live restrictions
	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;

		// Special live restrictions
		if (name === 'instructor' || name === 'taskName') {
			const trimmedValue = value.slice(0, 30); // enforce max 30 chars

			if (name === 'instructor') {
				const instructorRegex = /^[a-zA-Z\s\-'.]*$/;
				if (!instructorRegex.test(trimmedValue) && trimmedValue !== '') return;
				setFormData((prev) => ({ ...prev, [name]: trimmedValue }));
			} else if (name === 'taskName') {
				const taskNameRegex = /^[a-zA-Z0-9\s\-_.,!?()]*$/;
				if (!taskNameRegex.test(trimmedValue) && trimmedValue !== '') return;
				setFormData((prev) => ({ ...prev, [name]: trimmedValue }));
			}
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}

		if (errors[name]) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[name];
				return newErrors;
			});
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;

		if (file) {
			// Allowed file types (you can modify this list as needed)
			const allowedTypes = [
				'application/pdf',
				'application/msword',
				'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				'application/vnd.ms-excel',
				'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				'image/jpeg',
				'image/png',
				'text/plain',
			];

			// File size limit (optional) - e.g., 10 MB
			const maxSizeMB = 10;
			const maxSizeBytes = maxSizeMB * 1024 * 1024;

			if (!allowedTypes.includes(file.type)) {
				toast.error(
					'Invalid file type. Please upload a supported file format (PDF, DOC, DOCX, XLS, XLSX, JPG, PNG, or TXT).'
				);
				e.target.value = ''; // reset file input
				return;
			}

			if (file.size > maxSizeBytes) {
				toast.error(`File too large. Maximum allowed size is ${maxSizeMB} MB.`);
				e.target.value = '';
				return;
			}
		}

		setFormData((prev: any) => ({ ...prev, file }));
	};

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		// Instructor Name Validation
		if (!formData.instructor.trim()) {
			newErrors.instructor = 'Instructor name is required';
		} else if (!validateName(formData.instructor)) {
			newErrors.instructor =
				'Instructor name should contain letters and may include spaces, hyphens, apostrophes, or periods. Cannot contain only numbers or special characters.';
		} else if (formData.instructor.trim().length < 2) {
			newErrors.instructor =
				'Instructor name must be at least 2 characters long';
		} else if (formData.instructor.trim().length > 30) {
			newErrors.instructor = 'Instructor name cannot exceed 30 characters';
		}

		// Type Validation
		if (!formData.type.trim()) newErrors.type = 'Type is required';

		// Task Name Validation
		if (!formData.taskName.trim()) {
			newErrors.taskName = 'Task name is required';
		} else if (!validateTaskName(formData.taskName)) {
			newErrors.taskName =
				'Task name can contain letters, numbers, spaces, hyphens, underscores, and common punctuation. Cannot contain only special characters or numbers.';
		} else if (formData.taskName.trim().length < 2) {
			newErrors.taskName = 'Task name must be at least 2 characters long';
		} else if (formData.taskName.trim().length > 30) {
			newErrors.taskName = 'Task name cannot exceed 30 characters';
		}

		// Other validations
		if (!formData.task.trim()) newErrors.task = 'Task description is required';
		if (!formData.deadline) newErrors.deadline = 'Deadline is required';
		if (!formData.question.trim()) newErrors.question = 'Question is required';

		// Date validation - ensure deadline is not in the past
		if (!formData.deadline) {
			newErrors.deadline = 'Deadline is required';
		} else {
			const selectedDate = new Date(formData.deadline);

			// Check if valid date
			if (isNaN(selectedDate.getTime())) {
				newErrors.deadline = 'Invalid date format';
			} else {
				const today = new Date();
				today.setHours(0, 0, 0, 0); // normalize to midnight

				// Prevent past dates
				if (selectedDate < today) {
					newErrors.deadline = 'Deadline cannot be in the past';
				}

				// Optional: Prevent unrealistic future years (e.g., year > 2100)
				const year = selectedDate.getFullYear();
				if (year < 2000 || year > 2100) {
					newErrors.deadline =
						'Please select a realistic date (between 2000–2100)';
				}
			}
		}

		if (formData.score && !/^\d+$/.test(formData.score)) {
			newErrors.score = 'Score must be a number';
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

					fileUrl = uploadRes?.data?.file;
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
				task_name: formData.taskName.trim(),
				course: course?._id,
				deadline: new Date(formData.deadline).toISOString(),
				question: formData.question.trim(),
				status: 'pending',
				score: '0',
				remark: '',
				question_file: fileUrl,
			};

			// Call createTask API
			const res = await createTask(taskPayload, {});

			// Create the task object for local state
			const newTask: Task = {
				id: res?.data?.data?._id || Date.now().toString(),
				name: formData.name || 'Unnamed',
				type: formData.type,
				task: formData.task,
				deadline: formData.deadline,
				status: 'pending',
				instructor: formData.instructor.trim(),
				taskName: formData.taskName.trim(),
				question: formData.question.trim(),
				score: '0',
				file: formData.file,
			};

			onSave(newTask);
			toast.success('Success! Task added successfully!');
			onClose();
		} catch (err: any) {
			console.error('Task creation failed:', err);
			toast.error('Failed to create task');
		}
	};

	return (
		<div className='fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50'>
			<div
				className='bg-[#f1f4f8] rounded-2xl shadow-xl w-full max-w-4xl mx-4 scrollbar-hide'
				style={{ maxHeight: '90vh', overflowY: 'auto' }}
			>
				<div className='p-6'>
					<div className='flex justify-between items-center mb-6'>
						<h2 style={{ ...FONTS.heading_02 }}>Add New Task</h2>
						<button
							onClick={onClose}
							className='text-gray-500 hover:text-gray-700 text-2xl'
						>
							&times;
						</button>
					</div>

					<div className='grid grid-cols-2 gap-6'>
						{/* Instructor Name Field */}
						<div>
							<label className='block mb-1' style={{ ...FONTS.heading_05 }}>
								Instructor Name <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='instructor'
								value={formData.instructor}
								onChange={handleChange}
								placeholder='Enter instructor name'
								className={`p-3 rounded-lg w-full ${
									errors.instructor ? 'border border-red-500' : ''
								}`}
								style={{
									...FONTS.heading_06,
									boxShadow:
										'rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset',
								}}
							/>
							{errors.instructor && (
								<p className='text-red-500 text-sm mt-1'>{errors.instructor}</p>
							)}
							{/* {!errors.instructor && formData.instructor && (
								<p className='text-green-600 text-xs mt-1'>
									✓ Valid instructor name
								</p>
							)} */}
						</div>

						{/* Type Field */}
						<div>
							<label className='block mb-1' style={{ ...FONTS.heading_05 }}>
								Type <span className='text-red-500'>*</span>
							</label>
							<select
								name='type'
								value={formData.type}
								onChange={handleChange}
								className={`p-3 rounded-lg w-full ${
									errors.type ? 'border border-red-500' : ''
								}`}
								style={{
									...FONTS.heading_06,
									boxShadow:
										'rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset',
								}}
							>
								<option value=''>Select type</option>
								<option value='Task'>Task</option>
								<option value='Project'>Project</option>
							</select>
							{errors.type && (
								<p className='text-red-500 text-sm mt-1'>{errors.type}</p>
							)}
						</div>

						{/* Task Name Field */}
						<div>
							<label className='block mb-1' style={{ ...FONTS.heading_05 }}>
								Task Name <span className='text-red-500'>*</span>
							</label>
							<input
								type='text'
								name='taskName'
								value={formData.taskName}
								onChange={handleChange}
								placeholder='Enter task name'
								className={`p-3 rounded-lg w-full ${
									errors.taskName ? 'border border-red-500' : ''
								}`}
								style={{
									...FONTS.heading_06,
									boxShadow:
										'rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset',
								}}
							/>
							{errors.taskName && (
								<p className='text-red-500 text-sm mt-1'>{errors.taskName}</p>
							)}
							{/* {!errors.taskName && formData.taskName && (
								<p className='text-green-600 text-xs mt-1'>✓ Valid task name</p>
							)} */}
						</div>

						{/* Task Field */}
						<div>
							<label className='block mb-1' style={{ ...FONTS.heading_05 }}>
								Task <span className='text-red-500'>*</span>
							</label>
							<select
								name='task'
								value={formData.task}
								onChange={handleChange}
								className={`p-3 rounded-lg w-full ${
									errors.task ? 'border border-red-500' : ''
								}`}
								style={{
									...FONTS.heading_06,
									boxShadow:
										'rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset',
								}}
							>
								<option value=''>Select a task</option>
								{course?.coursemodules?.map(
									(
										item: {
											_id: string | number | readonly string[] | undefined;
											title:
												| string
												| number
												| bigint
												| boolean
												| ReactElement<
														unknown,
														string | JSXElementConstructor<any>
												  >
												| Iterable<ReactNode>
												| ReactPortal
												| Promise<
														| string
														| number
														| bigint
														| boolean
														| ReactPortal
														| ReactElement<
																unknown,
																string | JSXElementConstructor<any>
														  >
														| Iterable<ReactNode>
														| null
														| undefined
												  >
												| null
												| undefined;
										},
										index: any
									) => (
										<option key={item._id || index} value={item._id}>
											{item.title}
										</option>
									)
								)}
							</select>
							{errors.task && (
								<p className='text-red-500 text-sm mt-1'>{errors.task}</p>
							)}
						</div>

						{/* Deadline Field */}
						<div>
							<label className='block mb-1' style={{ ...FONTS.heading_05 }}>
								Deadline <span className='text-red-500'>*</span>
							</label>
							<input
								type='date'
								name='deadline'
								value={formData.deadline}
								onChange={handleChange}
								min={new Date().toISOString().split('T')[0]} // Prevent past dates
								className={`p-3 rounded-lg w-full ${
									errors.deadline ? 'border border-red-500' : ''
								}`}
								style={{
									...FONTS.heading_06,
									boxShadow:
										'rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset',
								}}
							/>
							{errors.deadline && (
								<p className='text-red-500 text-sm mt-1'>{errors.deadline}</p>
							)}
						</div>

						{/* Question Field */}
						<div className='col-span-2'>
							<label className='block mb-1' style={{ ...FONTS.heading_05 }}>
								Question <span className='text-red-500'>*</span>
							</label>
							<textarea
								name='question'
								value={formData.question}
								onChange={handleChange}
								placeholder='Enter question'
								rows={4}
								className={`p-3 rounded-lg w-full ${
									errors.question ? 'border border-red-500' : ''
								}`}
								style={{
									...FONTS.heading_06,
									boxShadow:
										'rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset',
								}}
							/>
							{errors.question && (
								<p className='text-red-500 text-sm mt-1'>{errors.question}</p>
							)}
						</div>

						{/* File Upload Field */}
						<div className='col-span-2'>
							<label className='block mb-1' style={{ ...FONTS.heading_05 }}>
								Question Paper
							</label>
							<div className='flex items-center gap-3'>
								<input
									type='file'
									onChange={handleFileChange}
									className='hidden'
									id='fileUpload'
								/>
								<label
									htmlFor='fileUpload'
									className='p-2 border cursor-pointer rounded-xl bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgaba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
									style={{ ...FONTS.heading_06 }}
								>
									Upload File
								</label>
								<span style={{ ...FONTS.heading_06 }}>
									{formData.file ? formData.file.name : 'No file chosen'}
								</span>
							</div>
						</div>
					</div>

					<div className='flex justify-end gap-4 mt-6 p-3 rounded-lg w-full bg-gray-10'>
						<Button
							variant='outline'
							onClick={onClose}
							style={{
								...FONTS.heading_06,
								cursor: 'pointer',
								boxShadow:
									'rgba(255,255,255,0.7) 5px 5px 4px, rgba(189,194,199,0.75) 2px 2px 3px inset',
							}}
						>
							Cancel
						</Button>
						<Button
							onClick={handleSubmit}
							className='cursor-pointer bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
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
