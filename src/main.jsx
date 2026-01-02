
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';

import {ThemeProvider} from "./context/ThemeContext"
import { AuthProvider } from "./context/AuthContext.jsx"

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
    
)
