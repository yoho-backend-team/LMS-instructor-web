/* eslint-disable @typescript-eslint/no-explicit-any */
import Gridprofile from '@/components/dashboard/ui/GridProgress';
import React from 'react';
import { FONTS } from '@/constants/uiConstants';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GetImageUrl } from '@/utils/helper';

const ProfileCard: React.FC = () => {
	const ClassesData: any = useSelector(
		(state: any) => state.dashboard.data.classes
	);
	const StudentData: any = useSelector(
		(state: any) => state.dashboard.data.user
	);
	const navigate = useNavigate();

	const data = [
		{
			title: 'Total Classes',
			icon: 'totalclass',
			total: ClassesData?.[0]?.total,
		},
		{
			title: 'Completed',
			icon: 'completed',
			total:
				ClassesData?.[0]?.offline_class?.completed +
				ClassesData?.[0]?.online_class?.completed || 0,
		},
		{
			title: 'Pending',
			icon: 'pending',
			total:
				ClassesData?.[0]?.offline_class?.pending +
				ClassesData?.[0]?.online_class?.pending || 0,
		},
		{
			title: 'Live Class',
			icon: 'liveclass',
			total: ClassesData?.[0]?.offline_class?.total,
		},
		{
			title: 'Online Class',
			icon: 'onlineclass',
			total: ClassesData?.[0]?.online_class?.total,
		},
		{
			title: 'Offline Class',
			icon: 'offlineclass',
			total: ClassesData?.[0]?.offline_class?.total,
		},
	];

	return (
		<div className='flex flex-col w-full h-[365px] gap-4 p-[20px] divshadow shadow-xl rounded-[16px]'>
			<h2 style={{ ...FONTS.heading_02 }}>Classes</h2>
			<div className='flex flex-row justify-between'>
				<div className='flex flex-row gap-5'>
					<img
						src={GetImageUrl(StudentData?.image) ?? StudentData?.image}
						alt={StudentData?.fullName}
						title={StudentData?.fullName}
						width={62}
						className='rounded-xl mt-1 h-[53px] object-cover'
					/>
					<div className='flex flex-col w-[215px] h-[53px]'>
						<h3
							style={{
								fontFamily: FONTS.heading_03.fontFamily,
								fontSize: FONTS.heading_03.fontSize,
								fontWeight: FONTS.heading_03.fontWeight,
							}}
							className='text-transparent bg-clip-text bg-gradient-to-r from-[#7B00FF] to-[#B200FF]'
						>
							{StudentData?.full_name}
						</h3>
						<p style={{ ...FONTS.para_01 }}>Trainer ID: {StudentData?.id}</p>
					</div>
				</div>
				<button
					type='button'
					onClick={() => navigate('/profile')}
					style={{
						fontFamily: FONTS.heading_06.fontFamily,
						fontWeight: FONTS.heading_06.fontWeight,
					}}
					className='items-center w-[104px] h-[48px] rounded-xl btnshadow cursor-pointer text-[#716F6F] text-[14px] hover:text-white btnhovershadow'
				>
					View Profile
				</button>
			</div>
			<div className='grid grid-cols-3 gap-5'>
				{data?.map((item, index) => {
					return (
						<div key={index} className='w-full h-24 rounded-xl divshadow'>
							<Gridprofile
								title={item.title}
								value={item.total}
								icon={item.icon}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ProfileCard;
