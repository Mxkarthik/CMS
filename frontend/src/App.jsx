import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Overview from "./pages/Overview";
import HeroPage from "./pages/Hero/HeroPage";
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
            </Route>
        </Routes>
    );
}

export default App;
