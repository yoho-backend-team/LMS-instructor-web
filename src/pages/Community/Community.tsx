import Communityside from '../../components/community/communityside';
import { useAppDispatch } from '../../features/community/redux/hooks';
import { getAllCommunitiesData } from '@/features/community/redux/commuityThunk';
import { useSelector } from 'react-redux';
import { selectCommunities } from '@/features/community/redux/communitySelector';
import { useEffect } from 'react';

const Community = () => {
    const dispatch = useAppDispatch();
	const communities = useSelector(selectCommunities);

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch(getAllCommunitiesData(''));
			} catch (error) {
				console.error('Community fetch error:', error);
			}
		};

		fetchData();
	}, [dispatch]);

	return (
		<>
			<div className='w-[260px] sticky ml-6 mt-2'>
				<p className='text-2xl font-semibold'>Community</p>
			</div>
			<Communityside communities={communities}/>
		</>
	);
};

export default Community;
