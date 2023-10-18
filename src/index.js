
import React from "react";
import {createRoot} from 'react-dom/client'
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { createTheme,ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./app/store";
import './index.css'
import ToggleColorModeProvider from './utils/ToggleColorMode'
const container= document.getElementById('root');
const root=createRoot(container);
root.render(
<Provider store={store}>
  <ToggleColorModeProvider>
  <BrowserRouter>
   <App />
  </BrowserRouter>
</ToggleColorModeProvider>
</Provider>
);