import { selectDashBoard } from '@/features/Dashboard/reducers/selectors';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useInstituteData = () => {
	const dispatch = useDispatch<any>();
	const func = async () => {
		await dispatch(getDashBoardReports());
	};
	useEffect(() => {
		func();
	}, [dispatch]);
	const instituteDetails = useSelector(selectDashBoard);
	return instituteDetails.institute;
};
