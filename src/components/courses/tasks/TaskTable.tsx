import React, { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select';
import { Portal } from '@radix-ui/react-portal';
import { FONTS } from '@/constants/uiConstants';
import navigationicon from '../../../assets/courses icons/navigation arrow.svg';
import EditTaskForm from './EditTaskForm';
import AddTaskForm from './AddTaskForm';
import CourseButton from '../button';
import { useNavigate } from 'react-router-dom';

export interface Task {
	_id(_id: any, arg1: { remark: any; mark: any; status: any; student: any; }): unknown;
	question_file(arg0: string, question_file: any): unknown;
	answers: any;
	id: string;
	name: string;
	type: string;
	task: string;
	deadline: string;
	status: string;
	is_active?: boolean;
	instructor: string;
	taskName: string;
	question: string;
	score: string;
	file: any;
}

interface TaskTableProps {
	tasks: Task[];
	onTaskUpdate: (updatedTasks: Task[]) => void;
	course: any;
	fetchTasks: () => void;
}

const TaskTable = React.memo(
	({ tasks, onTaskUpdate, course, fetchTasks }: TaskTableProps) => {
		const [showAddForm, setShowAddForm] = useState(false);
		const [showEditForm, setShowEditForm] = useState(false);
		const [selectedTask, setSelectedTask] = useState<Task | null>(null);
		const [currentPage, setCurrentPage] = useState(1);
		const [itemsPerPage, setItemsPerPage] = useState(10);
		const [statusFilter, setStatusFilter] = useState('all');
		const [typeFilter, setTypeFilter] = useState('all');
		const navigate = useNavigate();

		const filteredTasks = useMemo(() => {
			return tasks.filter((task) => {
				const matchesStatus =
					statusFilter === 'all' ||
					(statusFilter === 'active' && task.is_active === true) ||
					(statusFilter === 'inactive' && task.is_active === false);

				const matchesType =
					typeFilter === 'all' ||
					task.type.toLowerCase() === typeFilter.toLowerCase();

				return matchesStatus && matchesType;
			});
		}, [tasks, statusFilter, typeFilter]);

		const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		const currentItems = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);

		useEffect(() => {
			setCurrentPage(1);
		}, [statusFilter, typeFilter]);

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
				{ ...newTask, id: Date.now().toString() },
			];
			fetchTasks();
			onTaskUpdate(updatedTasks);
			setShowAddForm(false);
		};

		const handleEditTask = (updatedTask: Task) => {
			const updatedTasks = tasks.map((task) =>
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

		const handlePageChange = (pageNumber: number) => {
			setCurrentPage(pageNumber);
		};

		const getPageNumbers = () => {
			const pageNumbers = [];
			const maxPagesToShow = 5;

			if (totalPages <= maxPagesToShow) {
				for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
			} else {
				const startPage = Math.max(
					1,
					currentPage - Math.floor(maxPagesToShow / 2)
				);
				const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
				for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
			}
			return pageNumbers;
		};

		return (
			<div className='w-full mx-auto p-4'>
				{/* Navigation */}
				<div className='flex items-center gap-3 mb-6'>
					<Button
						onClick={() => navigate('/courses')}
						className='bg-[#EBEFF3] text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
					>
						<img src={navigationicon} alt='Navigation' />
					</Button>
					<h1 style={{ ...FONTS?.heading_02 }}>Task & Projects</h1>
				</div>
				<CourseButton activeTabs='task' />
				{/* Filters */}
				<div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6'>
					<div className='flex flex-col sm:flex-row gap-4 w-full lg:w-auto'>
						<Select value={typeFilter} onValueChange={setTypeFilter}>
							<SelectTrigger className='w-full sm:w-40'>
								<SelectValue placeholder='Filter by type' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>All Types</SelectItem>
								<SelectItem value='task'>Task</SelectItem>
								<SelectItem value='project'>Project</SelectItem>
							</SelectContent>
						</Select>

						<Select value={statusFilter} onValueChange={setStatusFilter}>
							<SelectTrigger className='w-full sm:w-40'>
								<SelectValue placeholder='Filter by status' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='all'>All Status</SelectItem>
								<SelectItem value='active'>Completed</SelectItem>
								<SelectItem value='inactive'>Pending</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<Button
						style={{ ...FONTS?.heading_07 }}
						onClick={handleNewTask}
						className='bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white rounded-xl px-4 py-2 shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] w-full lg:w-auto'
					>
						+ Add New Task
					</Button>
				</div>
				{/* Table */}
				<div className='hidden md:block'>
					<Card className='overflow-hidden bg-[#EBEFF3] rounded-xl shadow-inner'>
						<div className='flex flex-col'>
							<Card className='bg-gradient-to-r from-[#7B00FF] to-[#B200FF] !text-white p-4 mx-4 rounded-md mb-4'>
								<div className='grid grid-cols-5 gap-4 text-center'>
									<div>Name</div>
									<div>Type</div>
									<div>Task</div>
									<div>Deadline</div>
									<div>Status</div>
								</div>
							</Card>

							<div className='mx-4'>
								{currentItems.length === 0 ? (
									<p className='text-center text-gray-500 py-8'>
										No tasks available
									</p>
								) : (
									currentItems.map((task: any) => (
										<Card
											key={task.id}
											onClick={() => handleRowClick(task)}
											className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] p-4 mb-2 rounded-lg cursor-pointer hover:shadow-md transition-all'
										>
											<div className='grid grid-cols-5 gap-4 text-center items-center'>
												<div className='truncate'>{task.name}</div>
												<div className='capitalize'>{task.type}</div>
												<div className='truncate'>{task.task}</div>
												<div>{task.deadline}</div>
												<Button
													className={`px-4 py-1 text-sm font-medium rounded-lg ${
														task.is_active
															? 'bg-green-500 text-white'
															: 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white'
													}`}
												>
													{task.is_active ? 'Completed' : 'Pending'}
												</Button>
											</div>
										</Card>
									))
								)}
							</div>
						</div>
					</Card>
				</div>

				{/* Pagination and Items Per Page - Always visible */}
				<div className='flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 relative z-50'>
					<div className='text-sm text-gray-600'>
						Showing {indexOfFirstItem + 1}–
						{Math.min(indexOfLastItem, filteredTasks.length)} of{' '}
						{filteredTasks.length} tasks
					</div>

					{/* Pagination Controls - Only show if multiple pages */}
					{totalPages > 1 && (
						<div className='flex flex-wrap items-center justify-center gap-2'>
							<Button
								variant='outline'
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
							>
								Previous
							</Button>

							{getPageNumbers().map((page) => (
								<Button
									key={page}
									variant={currentPage === page ? 'default' : 'outline'}
									onClick={() => handlePageChange(page)}
									className={`px-3 py-1 ${
										currentPage === page
											? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white'
											: ''
									}`}
								>
									{page}
								</Button>
							))}

							<Button
								variant='outline'
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
							>
								Next
							</Button>
						</div>
					)}

					{/* Items Per Page Selector - Always visible */}
					<div className='relative'>
						<Select
							value={itemsPerPage.toString()}
							onValueChange={(value) => {
								setItemsPerPage(Number(value));
								setCurrentPage(1);
							}}
						>
							<SelectTrigger className='w-40'>
								<SelectValue placeholder='Items per page' />
							</SelectTrigger>

							<Portal>
								<SelectContent>
									<SelectItem value='5'>5 per page</SelectItem>
									<SelectItem value='10'>10 per page</SelectItem>
									<SelectItem value='20'>20 per page</SelectItem>
									<SelectItem value='50'>50 per page</SelectItem>
								</SelectContent>
							</Portal>
						</Select>
					</div>
				</div>
    
				{showAddForm && (
					<AddTaskForm
						onSave={handleAddTask}
						onClose={handleCloseForm}
						course={course}
					/>
				)}
				{showEditForm && selectedTask && (
					<EditTaskForm
						task={selectedTask}
						onSave={handleEditTask}
						onClose={handleCloseForm}
					/>
				)}
			</div>
		);
	}
);

export default TaskTable;
