import { useEffect } from 'react';
import PersonalInformation from '../../components/profile/profile';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '@/features/Profile/reducers/selectors';
import { getStudentProfileThunk } from '@/features/Profile/reducers/thunks';

const Profile = () => {

	const dispatch = useDispatch<any>();
	const profileDetails = useSelector(selectProfile);

	useEffect(() => {
		dispatch(getStudentProfileThunk());
		console.log(profileDetails);
	}, [dispatch]);
	return <PersonalInformation />;
};

export default Profile;
