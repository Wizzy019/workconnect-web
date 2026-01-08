import { faArrowAltCircleLeft, faBars, faBriefcase, faDashboard, faEnvelope, faGear, faList, faTimes, faUser, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {

  const { logout, profile } = useAuth();  // get profile for role
  const role = profile?.role;            // optional chaining

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!role) return <div className="p-4">Loadin...</div>

  // role-based nav items
  const navItems = role === "client"
    ? [
        { name: "Dashboard", icon: <FontAwesomeIcon icon={faDashboard}/>, path: `/dashboard/client` },
        { name: "Find Talent", icon: <FontAwesomeIcon icon={faBriefcase}/>, path: "/talents" },
        { name: "My Jobs", icon: <FontAwesomeIcon icon={faList}/>, path: "/myjobs" },
        { name: "Wallet", icon: <FontAwesomeIcon icon={faWallet}/>, path: "/wallet" },
        { name: "Messages", icon: <FontAwesomeIcon icon={faEnvelope}/>, path: "/messages" },
        { name: "Profile", icon: <FontAwesomeIcon icon={faUser}/>, path: "/profile" },
        { name: "Settings", icon: <FontAwesomeIcon icon={faGear}/>, path: "/settings" },
      ]
    : [ // freelancer
        { name: "Dashboard", icon: <FontAwesomeIcon icon={faDashboard}/>, path: `/dashboard/freelancer` },
        { name: "Opportunities", icon: <FontAwesomeIcon icon={faBriefcase}/>, path: "/joblist" },
        { name: "My Tasks", icon: <FontAwesomeIcon icon={faList}/>, path: "/mytasks" },
        { name: "Wallet", icon: <FontAwesomeIcon icon={faWallet}/>, path: "/wallet" },
        { name: "Messages", icon: <FontAwesomeIcon icon={faEnvelope}/>, path: "/messages" },
        { name: "Profile", icon: <FontAwesomeIcon icon={faUser}/>, path: "/profile" },
        { name: "Settings", icon: <FontAwesomeIcon icon={faGear}/>, path: "/settings" },
      ];

  return (
  <>
   <div className='md:hidden absolute top-0 left-0 mt-7 ml-5 '><FontAwesomeIcon icon={faBars} className='text-xl'
   onClick={() => setOpen(true)}
   /></div>
   <div className={`w-64 min-h-135 h-screen md:h-auto bg-white flex flex-col py-6 px-4 fixed top-0 left-0 transition-all duration-700 md:relative md:opacity-100 md:translate-0 
    ${open ? "opacity-100 translate-x-0 overflow-hidden" : "opacity-0 -translate-x-full" }`}>
      <div className="md:hidden ml-auto"><FontAwesomeIcon icon={faTimes} className="text-xl" onClick={() => setOpen(false)}/></div>
       <div className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition 
              ${isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"}`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="mt-auto pt-4">
        <button  className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium" 
        onClick={handleLogout}>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          Logout
        </button>
      </div>
    </div>
  </>
  );
}

export default Sidebar