import { Link, NavLink} from "react-router-dom";
import Logo from "../../assets/logos/logo.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [open, setOpen] = useState(false);

  const NavItems = [
    { name: "Home", path: "/" },
    { name: "How It Works", path: "#steps", isScroll: true },
    { name: "Find Work", path: "/joblist" },
    { name: "Hire Talent", path: "" },
    { name: "About", path: "footer", isScroll: true },
    { name: "Contact", path: "" },
    { name: "Login", path: "/login" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false); // close mobile menu
    }
  };

  // Handle clicks on navbar items
  const handleNavClick = (item) => {
  if (item.isScroll) {
    scrollToSection(item.path.replace("#", ""));
  }
  setOpen(false); // close mobile menu
};

  return (
    <header className="w-full flex justify-between md:items-center bg-black text-white h-15">
      <div className="w-full flex items-center justify-evenly md:w-auto">
        <img src={Logo} alt="workconnect-logo" className="size-10 md:size-15" />
        <h2 className="text-white font-bold cursor-pointer">WorkConnect</h2>
        <div className="text-right ml-auto md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className="text-white text-xl"
            onClick={() => setOpen(true)}
          />
        </div>
      </div>

      <nav
        className={`absolute w-full flex flex-col p-4 text-xl bg-black font-medium transition-transform duration-700 ease-in-out z-20 
        md:relative md:w-auto md:flex-row md:items-center md:h-15 md:opacity-100 md:translate-y-0 ${
          open ? "h-screen opacity-100 translate-y-0 text-3xl" : "opacity-0 -translate-y-full"
        }`}
      >
        <div className="text-right md:hidden">
          <FontAwesomeIcon
            icon={faTimes}
            className="text-white"
            onClick={() => setOpen(false)}
          />
        </div>

        {NavItems.map((item) =>
          item.isScroll ? (
            <button
              key={item.name}
              onClick={() => handleNavClick(item)}
              className="text-white p-2 text-center text-3xl md:text-xl"
            >
              {item.name}
            </button>
          ) : (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className="text-white p-2 text-center text-3xl md:text-xl"
            >
              {item.name}
            </NavLink>
          )
        )}
      </nav>

      <Link to="register/step-1" className="text-white">
        <button className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition hidden md:block">
          Get Started
        </button>
      </Link>
    </header>
  );
}

export default Navbar;