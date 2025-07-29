import { useEffect } from 'react';
import HelpCentre from '../../components/Helpcenter/helpcenter';
import { useDispatch } from 'react-redux';
import { getHelpThunk } from '@/features/helpcenter/reduces/thunks';
import { getStudentProfileThunk } from '@/features/Profile/reducers/thunks';
import { getInstructorInstituteDetails } from '@/hooks/TabViewResponce/common';

const HelpCenter = () => {
	const dispatch = useDispatch<any>();
	const institute = getInstructorInstituteDetails();

	useEffect(() => {
		dispatch(getStudentProfileThunk());
		dispatch(getHelpThunk({ instituteid: institute?.uuid }));
	}, [dispatch]);

	return <HelpCentre />;
};

export default HelpCenter;
