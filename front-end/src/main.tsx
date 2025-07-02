import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './Contexts/AuthContext.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "@styles/global.css"
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<App />
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
			/>
		</AuthProvider>
	</StrictMode>,
)
