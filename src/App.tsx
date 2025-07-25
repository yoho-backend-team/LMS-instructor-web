import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { LoadingProvider } from './context/LoadingContext/LoadingContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
	return (
		<BrowserRouter>
			<LoadingProvider>
				<AuthProvider>
					<ToastContainer
						position='top-right'
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme='colored'
					/>
					<AppRoutes />
				</AuthProvider>
			</LoadingProvider>
		</BrowserRouter>
	);
}

export default App;
