import { useEffect } from 'react';
import PersonalInformation from '../../components/profile/profile';
import { useDispatch } from 'react-redux';
import { getStudentProfileThunk } from '@/features/Profile/reducers/thunks';

const Profile = () => {
	const dispatch = useDispatch<any>();

	useEffect(() => {
		dispatch(getStudentProfileThunk());
	}, [dispatch]);

	return <PersonalInformation />;
};

export default Profile;
