import { Link } from 'react-router-dom';
import questionImg from '../../assets/icons/footer/question.png';
import helpcenterImg from '../../assets/helpcenters/Help Center (1).png';
import ticketImg from '../../assets/icons/footer/ticket.png';
import refreshImg from '../../assets/icons/footer/refresh.png';
import { FONTS } from '@/constants/uiConstants';

const Footer = () => {
	return (
		<>
			<footer className='flex justify-between px-6 py-3'>
				<div className='flex gap-4'>
					<div>
						<Link
							to='help-center'
							style={{ ...FONTS.heading_03 }}
							className='flex justify-center items-center gap-3'
						>
							<img
								src={helpcenterImg}
								alt='question'
								style={{ height: 25, width: 25 }}
							/>
							Help Center
						</Link>
					</div>
					<div>
						<Link
							to='faqs'
							style={{ ...FONTS.heading_03 }}
							className='flex justify-center items-center gap-3'
						>
							<img
								src={questionImg}
								alt='faq'
								style={{ height: 25, width: 25 }}
							/>
							FAQ
						</Link>
					</div>
				</div>
				<div className='flex gap-4'>
					<div>
						<Link
							to='activity-logs'
							style={{ ...FONTS.heading_03 }}
							className='flex justify-center items-center gap-3'
						>
							<img
								src={refreshImg}
								alt='activity'
								style={{ height: 25, width: 25 }}
							/>
							Activity Log
						</Link>
					</div>
					<div>
						<Link
							to='tickets'
							style={{ ...FONTS.heading_03 }}
							className='flex justify-center items-center gap-3'
						>
							<img
								src={ticketImg}
								alt='ticket'
								style={{ height: 25, width: 25 }}
							/>
							Ticket
						</Link>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
