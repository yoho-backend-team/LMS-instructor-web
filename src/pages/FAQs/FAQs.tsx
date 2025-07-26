import FAQInterface from '@/components/Faq/Faq';
import { getFaqThunk } from '@/features/faq/reduces/thunks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const FAQs = () => {
	const dispatch = useDispatch<any>();

	useEffect(() => {
		// getFaqThunk(dispatch)
		dispatch(getFaqThunk());
	}, [dispatch]);

	return (<FAQInterface />);
};

export default FAQs;
