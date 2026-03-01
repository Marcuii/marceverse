/**
 * @file main.jsx
 * @description Client portfolio entry point.
 *
 * Wraps the React tree in `<BrowserRouter>` for client-side routing and
 * `<GeneralInfoProvider>` so every component can access site-wide data
 * (name, socials, skills, etc.) via the `useGeneralInfo()` hook.
 */

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { GeneralInfoProvider } from "./context/GeneralInfoContext";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GeneralInfoProvider>
      <App />
    </GeneralInfoProvider>
  </BrowserRouter>,
)
