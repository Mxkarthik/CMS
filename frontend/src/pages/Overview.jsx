import { useOutletContext } from "react-router-dom";
import { HiOutlineChartBar, HiOutlineFolderOpen, HiOutlinePhoto } from "react-icons/hi2";

function StatCard({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                <Icon className="text-gray-500 text-lg" aria-hidden="true" />
            </div>
            <div className="min-w-0">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider truncate">{label}</p>
                <p className="text-xl font-semibold text-gray-900 mt-0.5">{value}</p>
            </div>
        </div>
    );
}

export default function Overview() {
    const { user } = useOutletContext();

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-10">
            {/* profile */}
            <section aria-label="Profile" className="flex items-center gap-4">
                {user.profilePicture ? (
                    <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover shadow-sm shrink-0"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shrink-0">
                        <span className="text-white text-xl sm:text-2xl font-bold">{user.name?.[0]}</span>
                    </div>
                )}
                <div className="min-w-0">
                    <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                        Welcome, {user.name}
                    </h1>
                    <p className="text-sm text-gray-400 mt-0.5 truncate">{user.email}</p>
                    <span className="inline-block mt-1.5 text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5">
                        {user.role}
                    </span>
                </div>
            </section>

            {/* analytics */}
            <section aria-label="Analytics">
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">
                    Analytics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <StatCard icon={HiOutlineChartBar} label="Page Views" value="—" />
                    <StatCard icon={HiOutlineFolderOpen} label="Projects" value="—" />
                    <StatCard icon={HiOutlinePhoto} label="Hero Slides" value="—" />
                </div>
            </section>
        </div>
    );
}
