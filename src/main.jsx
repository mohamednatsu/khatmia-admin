import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@material-tailwind/react";
import Messages from './pages/Messages.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <>
      <App />
      <Messages />
      </>
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
