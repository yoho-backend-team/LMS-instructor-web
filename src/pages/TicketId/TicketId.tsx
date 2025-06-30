import { useNavigate, useParams } from 'react-router-dom';
import ticketicon from '../../assets/icons/Tickets/back.png';
import messageicon from '../../assets/icons/Tickets/Frame 301.png';
import sendicon from '../../assets/icons/Tickets/Frame 5386.png';
import { Button } from '@/components/ui/button';
import { COLORS, FONTS } from "@/constants/uiConstants";
import { useLocation } from 'react-router-dom';

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const TicketId = () => {
	const { id } = useParams();

	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	}
	const location = useLocation();
	const ticket = location.state;


	return (
		<div className="p-6">

			<div className="flex justify-between items-center mb-6">
				<div className="flex items-center gap-3">
					<img
						src={ticketicon}
						alt="Back"
						className=" cursor-pointer"
						onClick={handleBack}
					/>
					<h1 className="text-2xl font-semibold" style={{ ...FONTS.heading_01 }}>Ticket</h1>
				</div>

				<h2 className="text-lg font-semibold text-gray-700" style={{ ...FONTS.heading_04, color: COLORS.blue_02, fontSize: '24px' }}>
					TICKET ID: Ticket #{id}
				</h2>
			</div>


			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

				<Card className="bg-[#ebeff3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] " style={{ ...FONTS.heading_04 }}>
					<CardHeader>
						<CardTitle>
							<h1>#{id} {ticket?.contentTitle || 'This ticket was created from the Instructor Mobile App'}</h1>
						</CardTitle>



					</CardHeader>

					<div className="flex flex-col gap-4">
						<Card className="self-end w-[250px] mr-10 h-30  bg-[#ebeff3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]">
							<CardContent className="pb-3">
								<div className="flex justify-between items-center mb-2">
									<p className="text-sm !text-gray-800 font-medium" style={{ ...FONTS.para_01, fontSize: '15px' }}>Surya</p>
									<p className="text-xs !text-gray-500" style={{ ...FONTS.para_01, fontSize: '12px' }}>10 May 2025</p>
								</div>
								<p className="text-sm !text-gray-700 text-right pt-6 pl-6" style={{ ...FONTS.para_01, fontSize: '14px' }}>I have attendance issue</p>
							</CardContent>
						</Card>
						<Card className="self-start w-[250px] ml-10 h-30  bg-[#ebeff3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]">
							<CardContent className="pb-3">
								<div className="flex justify-between items-center mb-2">
									<p className="text-sm !text-gray-800 font-medium" style={{ ...FONTS.para_01, fontSize: '15px' }}>Oliver Smith</p>
									<p className="text-xs !text-gray-500" style={{ ...FONTS.para_01, fontSize: '12px' }}>10 May 2025</p>
								</div>
								<div className="flex justify-end pt-6 pl-6">
									<Button
										className="px-2 py-1 text-xs rounded-sm bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white 
    shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] 
    hover:opacity-90 transition"
										style={{ ...FONTS.para_01, fontSize: '15px' }}
									>
										problem Solved
									</Button>


								</div>
							</CardContent>
						</Card>
					</div>
					<CardFooter className="mt-30 px-4">
						<div className="flex items-center w-full gap-3">
							<div className="p-2 bg-[#ebeff3] rounded-md ">
								<img
									src={messageicon}
									alt="Message"
									className="w-12 h-12 object-contain cursor-pointer"
								/>
							</div>


							<div className="flex-1 bg-[#ebeff3] rounded-md shadow-[inset_2px_2px_5px_rgba(189,194,199,0.75),3px_3px_5px_rgba(255,255,255,0.7)] px-3 py-2" style={{ ...FONTS.para_01, fontSize: '15px' }}>
								<input
									type="text"
									placeholder="Say Something..."
									className="w-full bg-transparent focus:outline-none text-sm !text-gray-800"
								/>
							</div>


							<div className="p-2 bg-[#ebeff3] rounded-md ">
								<img
									src={sendicon}
									alt="Send"
									className="w-12 h-12 object-contain cursor-pointer "
								/>
							</div>

						</div>
					</CardFooter>

				</Card>


				<Card className="bg-[#ebeff3] p-4  rounded-xl w-full shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)]">


					<CardContent className="space-y-4">
						<div>
							<label className="text-sm font-medium !text-gray-800 block mb-1" style={{ ...FONTS.para_01, fontSize: '15px' }}>Issue Description</label>
							<div className="bg-[#ebeff3] text-sm !text-gray-700 mt-6 rounded-md p-3 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ ...FONTS.para_01, fontSize: '14px' }}>
								{ticket?.contentDescription || "No description available"}
							</div>
						</div>

						<div>
							<label className="text-sm font-medium !text-gray-800 block mb-1" style={{ ...FONTS.para_01, fontSize: '15px' }}>Issue Category</label>
							<div className="bg-[#ebeff3] text-sm mt-6 !text-gray-700 rounded-md p-3 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ ...FONTS.para_01, fontSize: '14px' }}>
								{ticket?.category || "General"}
							</div>
						</div>

						<div>
							<label className="text-sm font-medium !text-gray-800 block mb-1" style={{ ...FONTS.para_01, fontSize: '15px' }}>Attachments</label>
							<div className="bg-[#ebeff3] text-sm !text-gray-700 mt-6 rounded-md p-3 flex justify-between items-center shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ ...FONTS.para_01, fontSize: '14px' }}>
								<span>{ticket?.attachment || "No Attachment"}</span>
								{ticket?.attachment && (
									<a href={ticket.attachment} target="_blank" rel="noopener noreferrer" className="!text-[#7b00ff] text-sm font-medium hover:underline">
										View
									</a>
								)}
							</div>
						</div>

						<div>
							<label className="text-sm font-medium !text-gray-800 block mb-1" style={{ ...FONTS.para_01, fontSize: '15px' }}>Status</label>
							<div className="bg-[#ebeff3] rounded-md p-2 mt-5 w-full shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]">
								<Button className="px-5 py-2 text-xs rounded-sm bg-gradient-to-l from-[#7B00FF] to-[#B200FF] !text-white shadow-[...]" style={{ ...FONTS.para_01, fontSize: '15px' }}>
									{ticket?.status || "Unknown"}
								</Button>
							</div>
						</div>

						<div>
							<label className="text-sm font-medium !text-gray-800 block mb-1" style={{ ...FONTS.para_01, fontSize: '15px' }}>Attempt</label>
							<div className="bg-[#ebeff3] text-sm !text-gray-700 rounded-md mt-5 p-3 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={{ ...FONTS.para_01, fontSize: '14px' }}>
								{ticket?.count ?? 0}
							</div>
						</div>
					</CardContent>

				</Card>

			</div>
		</div>
	);
};

export default TicketId;
