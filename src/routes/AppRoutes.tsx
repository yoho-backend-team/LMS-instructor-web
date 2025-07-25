import AboutCourse from '@/components/courses/AboutCourse';
import { useAuth } from '@/context/AuthContext/AuthContext';
import MainLayout from '@/layout/MainLayout';
import ActivityLogs from '@/pages/ActivityLogs/ActivityLogs';
import Attendance from '@/pages/Attendance/Attendance';
import EmailVerification from '@/pages/Authentication/EmailVerification/EmailVerification';
import Login from '@/pages/Authentication/Login/Login';
import OtpVerification from '@/pages/Authentication/OtpVerification/OtpVerification';
import Classes from '@/pages/Classes/Classes';
import ClassId from '@/pages/ClassId/ClassId';
import Community from '@/pages/Community/Community';
import CommunityId from '@/pages/CommunityId/CommunityId';
import CourseId from '@/pages/CourseId/CourseId';
import Courses from '@/pages/Courses/Courses';
import NotesMaterials from '@/components/courses/notes__materials';
import Dashboard from '@/pages/Dashboard/Dashboard';
import FAQs from '@/pages/FAQs/FAQs';
import HelpCenter from '@/pages/HelpCenter/HelpCenter';
import Notifications from '@/pages/Notifications/Notifications';
import Payment from '@/pages/Payment/Payment';
import Placement from '@/pages/Placement/Placement';
import Profile from '@/pages/Profile/Profile';
import TicketId from '@/pages/TicketId/TicketId';
import Tickets from '@/pages/Tickets/Tickets';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Createtickets } from '@/components/Tickets/Createtickets';
import Batches from '@/components/courses/Batches';
import CourseNotes from '@/components/courses/coursenotes';
import ChangePasswordPage from '@/pages/Authentication/ChangePassword/ChangePassword';

const AppRoutes = () => {
	const { isAuthenticated, isLoading } = useAuth();
	if (isLoading) return null;

	const AuthRoutes = () => (
		<Routes>
			<Route path='login' element={<Login />} />
			<Route path='forgot-password' element={<EmailVerification />} />
			<Route path='otp-verify' element={<OtpVerification />} />
			<Route path='change-password' element={<ChangePasswordPage />} />
			<Route path='*' element={<Navigate to='/login' />} />
		</Routes>
	);

	const StudentRoutes = () => (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route index element={<Dashboard />} />
				<Route path='classes' element={<Classes />} />
				<Route path='class/:classType/:id' element={<ClassId />} />
				<Route path='courses' element={<Courses />} />
				<Route path='course/:id' element={<CourseId />} />
				<Route path='activity-logs' element={<ActivityLogs />} />
				<Route path='tickets' element={<Tickets />} />
				<Route path='ticket/:id' element={<TicketId />} />
				<Route path='/tickets/create-ticket' element={<Createtickets />} />
				<Route path='profile' element={<Profile />} />
				<Route path='help-center' element={<HelpCenter />} />
				<Route path='faqs' element={<FAQs />} />
				<Route path='notifications' element={<Notifications />} />
				<Route path='community' element={<Community />} />
				<Route path='community/:id' element={<CommunityId />} />
				<Route path='attendance' element={<Attendance />} />
				<Route path='placement' element={<Placement />} />
				<Route path='payment' element={<Payment />} />
				<Route path='note_materials' element={<CourseNotes />} />
				<Route path='about/:course' element={<AboutCourse />} />
				<Route path='notes_materials' element={<NotesMaterials />} />
				<Route path='batches' element={<Batches />} />
				<Route path='*' element={<Navigate to='/' />} />
			</Route>
		</Routes>
	);

	return isAuthenticated ? <StudentRoutes /> : <AuthRoutes />;
};

export default AppRoutes;
