import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from "react-router-dom";
import RoutesPage from './routes/RoutesPage'
import { theme } from './theme/theme';

import './index.css'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <ToastContainer />
        <CssBaseline />
        <RoutesPage />
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>
)
