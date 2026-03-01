/**
 * @file App.jsx
 * @description Root component defining the admin routing tree.
 *
 * Routes:
 *  /login            — Public login page
 *  /                 — Protected layout (sidebar + Outlet)
 *    index           — Dashboard overview
 *    projects/*      — Project CRUD (dedicated pages)
 *    :entity/*       — Config-driven entity CRUD (EntityListPage / EntityFormPage)
 *    general         — Singleton GeneralInfo editor
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectForm from './pages/ProjectForm';
import EntityListPage from './pages/EntityListPage';
import EntityFormPage from './pages/EntityFormPage';
import GeneralInfo from './pages/GeneralInfo';

/**
 * Redirects unauthenticated users to /login.
 * @param {{ children: React.ReactNode }} props
 */
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          
          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<ProjectForm />} />
          <Route path="projects/edit/:id" element={<ProjectForm />} />

          {/* Generic entity routes — config-driven */}
          <Route path=":entity" element={<EntityListPage />} />
          <Route path=":entity/new" element={<EntityFormPage />} />
          <Route path=":entity/edit/:id" element={<EntityFormPage />} />

          <Route path="general" element={<GeneralInfo />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
