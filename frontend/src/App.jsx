import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import HeroPage from "./pages/Hero/HeroPage";
import ProjectsPage from "./pages/Projects/ProjectsPage";
import ProjectFormPage from "./pages/Projects/ProjectFormPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Overview />} />
                <Route path="hero" element={<HeroPage />} />
                <Route path="projects" element={<ProjectsPage />} />
                <Route path="projects/new" element={<ProjectFormPage />} />
                <Route path="projects/:id/edit" element={<ProjectFormPage />} />
            </Route>
        </Routes>
    );
}

export default App;
