import { AuthProvider } from './context/AuthProvider'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import axios from 'axios';

axios.defaults.baseURL = 'https://www.themealdb.com/api/json/v1/1';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

