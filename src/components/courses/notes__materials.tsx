import { Card } from '../ui/card';
import { Button } from '../ui/button';
import pdfimage from '../../assets/icons/notes/image 59.png';
import Edit from '../../assets/courses icons/Edit-alt.png';
import Trash from '../../assets/courses icons/Trash.png';
import { FONTS } from '@/constants/uiConstants';
import { useSelector } from 'react-redux';
import { selectCoursedata } from '@/features/Course/reducers/selector';
import { GetImageUrl } from '@/utils/helper';
import { deleteNotes } from '@/features/Course/services/Course';
import { toast } from 'react-toastify';

interface SelectedNotes {
	_id: string;
	title: string;
	description: string;
	file: any;
}

interface NotesMaterialsProps {
	setselectedNotes: (note: SelectedNotes) => void;
}

const NotesMaterials = ({ setselectedNotes }: NotesMaterialsProps) => {
	const courseSelectData = useSelector(selectCoursedata);

	const formattedDate = (date: any) => {
		const newDate = new Date(date).toLocaleString('en-IN', {
			timeZone: 'Asia/Kolkata',
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
		});
		return newDate;
	};

	const handleDeleteNotes = async (note: any) => {
		try {
			const response = await deleteNotes({
				noteId: note?.uuid,
			});
			console.log(response, 'deleted response');
			if (response) {
				toast.success(`${note?.title} deleted`);
			} else {
				toast.error('Failed to delete the note, please try again.');
			}
		} catch (error) {
			toast.error('Something went wrong, please try again.');
		}
	};

	return (
		<div className='w-full h-screen mx-auto p-4 mt-6'>
			<Card className='overflow-hidden bg-[#EBEFF3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6'>
				<div className='flex flex-col'>
					<Card className='bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white p-6 sticky top-0 z-10 ml-4 mr-4 mb-4'>
						<div className='grid grid-cols-4 gap-4'>
							<div
								className='text-center !text-white'
								style={{ ...FONTS.heading_02 }}
							>
								File
							</div>
							<div
								className='text-center !text-white'
								style={{ ...FONTS.heading_02 }}
							>
								Name
							</div>
							<div
								className='text-center !text-white'
								style={{ ...FONTS.heading_02 }}
							>
								Date
							</div>
							<div
								className='text-center !text-white'
								style={{ ...FONTS.heading_02 }}
							>
								Actions
							</div>
						</div>
					</Card>

					<div
						className='max-h-[500px] overflow-y-auto mx-4 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100'
						style={{ scrollbarWidth: 'none' }}
					>
						{courseSelectData?.notes?.length ? (
							courseSelectData?.notes?.map((note: any, index: any) => (
								<Card
									key={index}
									className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] text-black p-4 mb-2 hover:shadow-lg transition-shadow duration-300'
								>
									<div className='grid grid-cols-4 gap-4 items-center'>
										<div className='flex justify-center'>
											<a
												href={GetImageUrl(note?.file) ?? undefined}
												download
												target='_blank'
												rel='noopener noreferrer'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
											>
												<img
													src={pdfimage}
													className='w-10 h-12 cursor-pointer'
													alt='PDF icon'
												/>
											</a>
										</div>
										<div
											className='text-center !text-gray-600'
											style={{ ...FONTS.heading_07 }}
										>
											{note?.title}
										</div>
										<div
											className='text-center !text-gray-600'
											style={{ ...FONTS.heading_07 }}
										>
											{formattedDate(note?.updatedAt)}
										</div>
										<div className='flex justify-center'>
											<Button
												className='bg-[#EBEFF3] p-2 w-12 h-10 hover:bg-[#EBEFF3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] cursor-pointer'
												variant='outline'
												onClick={() => setselectedNotes(note)}
											>
												<img src={Edit} className='w-5 h-5' alt='Edit Button'/>
											</Button>

											<Button
												className='bg-[#EBEFF3] w-12 h-10 ml-2 hover:bg-[#EBEFF3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] cursor-pointer'
												variant='outline'
												onClick={() => handleDeleteNotes(note)}
											>
												<img
													src={Trash}
													className='w-5 h-5'
													alt='Delete Button'
												/>
											</Button>
										</div>
									</div>
								</Card>
							))
						) : (
							<div className='flex justify-center mt-3'>
								<p style={{ ...FONTS.heading_06 }}>No notes available</p>
							</div>
						)}
					</div>
				</div>
			</Card>
		</div>
	);
};

export default NotesMaterials;
