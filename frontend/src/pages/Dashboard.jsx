import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiLogoutBoxLine } from "react-icons/ri";
import { HiOutlineChartBar, HiOutlineFolderOpen, HiOutlinePhoto } from "react-icons/hi2";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

function StatCard({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                <Icon className="text-gray-500 text-lg" aria-hidden="true" />
            </div>
            <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-xl font-semibold text-gray-900 mt-0.5">{value}</p>
            </div>
        </div>
    );
}

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${API}/auth/me`, { withCredentials: true })
            .then((res) => setUser(res.data.user))
            .catch(() => navigate("/", { replace: true }));
    }, [navigate]);

    const handleLogout = async () => {
        await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
        navigate("/", { replace: true });
    };

    if (!user) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-white">
                <span className="text-sm text-gray-400 animate-pulse">Loading…</span>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50/60">
            {/* top nav */}
            <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                        <span className="text-white text-sm font-black select-none">N</span>
                    </div>
                    <span className="font-semibold text-gray-900 tracking-tight">NSK ETECH</span>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    aria-label="Logout"
                    className="
                        flex items-center gap-2 px-4 py-2
                        text-sm font-medium text-gray-500
                        rounded-xl border border-gray-200
                        hover:bg-gray-50 hover:text-gray-700
                        transition-colors duration-150
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900
                        cursor-pointer
                    "
                >
                    <RiLogoutBoxLine aria-hidden="true" />
                    Logout
                </button>
            </nav>

            <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
                {/* profile */}
                <section aria-label="Profile" className="flex items-center gap-5">
                    {user.profilePicture ? (
                        <img
                            src={user.profilePicture}
                            alt={user.name}
                            className="w-16 h-16 rounded-2xl object-cover shadow-sm"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">{user.name?.[0]}</span>
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
                        <p className="text-sm text-gray-400 mt-0.5">{user.email}</p>
                        <span className="inline-block mt-1.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5">
                            {user.role}
                        </span>
                    </div>
                </section>

                {/* analytics placeholder */}
                <section aria-label="Analytics">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Analytics</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatCard icon={HiOutlineChartBar} label="Page Views" value="—" />
                        <StatCard icon={HiOutlineFolderOpen} label="Projects" value="—" />
                        <StatCard icon={HiOutlinePhoto} label="Hero Slides" value="—" />
                    </div>
                </section>

                {/* projects placeholder */}
                <section aria-label="Projects">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Projects</h2>
                    <div className="bg-white border border-gray-100 rounded-2xl px-6 py-10 text-center shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]">
                        <HiOutlineFolderOpen className="text-3xl text-gray-300 mx-auto mb-2" aria-hidden="true" />
                        <p className="text-sm text-gray-400">No projects yet</p>
                    </div>
                </section>

                {/* hero placeholder */}
                <section aria-label="Hero">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Hero</h2>
                    <div className="bg-white border border-gray-100 rounded-2xl px-6 py-10 text-center shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]">
                        <HiOutlinePhoto className="text-3xl text-gray-300 mx-auto mb-2" aria-hidden="true" />
                        <p className="text-sm text-gray-400">No hero slides yet</p>
                    </div>
                </section>
            </div>
        </main>
    );
}
