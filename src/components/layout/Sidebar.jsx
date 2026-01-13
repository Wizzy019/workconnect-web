import { 
  faArrowAltCircleLeft, faBars, faBriefcase, faDashboard, faEnvelope, 
  faGear, faList, faTimes, faUser, faWallet, 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { logout, profile } = useAuth();
  const role = profile?.role;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!role) return <div className="p-10 font-bold text-[#1dbf73] animate-pulse">Loading...</div>;

  /* --- FAVORITES SECTION (WorkConnect Specific) --- */
  // const favorites = [
  //   { name: 'Active Projects', icon: faRocket, path: role === 'client' ? '/myjobs' : '/mytasks' },
  //   { name: 'Saved Items', icon: faBookmark, path: '/saved' },
  //   { name: 'Platform Rules', icon: faShieldAlt, path: '/rules' },
  //   { name: 'Documents', icon: faFileAlt, path: '/docs' },
  // ];  faShieldAlt, faRocket, faBookmark, faFileAlt 
  /* ------------------------------------------------ */

  const navItems = role === "client"
    ? [
        { name: "Dashboard", icon: faDashboard, path: `/dashboard/client` },
        { name: "Find Talent", icon: faBriefcase, path: "/talents" },
        { name: "My Jobs", icon: faList, path: "/myjobs" },
        { name: "Wallet", icon: faWallet, path: "/wallet" },
        { name: "Messages", icon: faEnvelope, path: "/messages" },
        { name: "Profile", icon: faUser, path: "/profile" },
        { name: "Settings", icon: faGear, path: "/settings" },
      ]
    : [
        { name: "Dashboard", icon: faDashboard, path: `/dashboard/freelancer` },
        { name: "Opportunities", icon: faBriefcase, path: "/joblist" },
        { name: "My Tasks", icon: faList, path: "/mytasks" },
        { name: "Wallet", icon: faWallet, path: "/wallet" },
        { name: "Messages", icon: faEnvelope, path: "/messages" },
        { name: "Profile", icon: faUser, path: "/profile" },
        { name: "Settings", icon: faGear, path: "/settings" },
      ];

  return (
    <>
      <div className='md:hidden absolute top-0 left-0 mt-5'>
        <FontAwesomeIcon 
          icon={faBars} 
          className='text-xl text-[#001e2b]'
          onClick={() => setOpen(true)}
        />
      </div>

      {open && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 left-0 h-screen w-72 bg-white border-r border-gray-100 transition-all duration-500 ease-in-out flex flex-col
        ${open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 md:opacity-100 md:translate-x-0"} 
        md:relative md:flex
      `}>
        
        <div className="flex flex-col h-full overflow-y-auto px-6 py-8">
          
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1dbf73] rounded-xl flex items-center justify-center shadow-lg shadow-green-100">
                <span className="text-white font-black text-xl italic">W</span>
              </div>
              <span className="font-black text-[#001e2b] text-xl tracking-tight">Workconnect</span>
            </div>
            <button onClick={() => setOpen(false)} className="md:hidden text-gray-400 hover:text-red-500">
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>

          {/* <div className="mb-10">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">Favorites</h4>
            <ul className="space-y-1">
              {favorites.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all
                      ${isActive ? 'bg-gray-50 text-[#001e2b]' : 'text-gray-500 hover:bg-gray-50 hover:text-[#001e2b]'}
                    `}
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-4 text-gray-400" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div> */}

          <div className="flex-1">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-4">Main Menu</h4>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `
                      flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all
                      ${isActive ? 'bg-[#f3f7f9] text-[#1dbf73]' : 'text-gray-500 hover:bg-gray-50 hover:text-[#001e2b]'}
                    `}
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-4" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-50">
            <button 
              className="w-full flex items-center gap-3 px-3 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold text-sm transition-all" 
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faArrowAltCircleLeft} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;