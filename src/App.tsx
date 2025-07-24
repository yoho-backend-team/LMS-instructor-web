import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';

import { AuthProvider } from './context/AuthContext/AuthContext';
import { LoadingProvider } from './context/LoadingContext/LoadingContext';

function App() {
	return (

		<BrowserRouter>
			<LoadingProvider>
				<AuthProvider>
					<AppRoutes />
				</AuthProvider>
			</LoadingProvider>
		</BrowserRouter>

	);
}

export default App;
