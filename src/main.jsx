import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@material-tailwind/react";
import Messages from './pages/Messages.jsx'
import Cookies from "js-cookie"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <>
      <App />
      {
        Cookies.get("token") && <Messages />
      }
      </>
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
