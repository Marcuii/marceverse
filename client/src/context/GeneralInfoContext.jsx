/**
 * @file GeneralInfoContext.jsx
 * @description React context that fetches and caches the singleton
 * GeneralInfo document from the API on mount.
 *
 * Provides `{ generalInfo, loading }` to all descendants via the
 * `useGeneralInfo()` hook.  Used by Hero, About, Contact, Navbar, etc.
 */

import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

const GeneralInfoContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useGeneralInfo = () => useContext(GeneralInfoContext);

export const GeneralInfoProvider = ({ children }) => {
  const [generalInfo, setGeneralInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/general`)
      .then((res) => res.json())
      .then((data) => {
        setGeneralInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching general info:", err);
        setLoading(false);
      });
  }, []);

  return (
    <GeneralInfoContext.Provider value={{ generalInfo, loading }}>
      {children}
    </GeneralInfoContext.Provider>
  );
};
