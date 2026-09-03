import { NavLink, useNavigate, useLocation } from "react-router-dom";

export function SmartNavLink({ to, children, ...props }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    // Check if the link is an in-page section link
    if (to.startsWith("#")) {
      e.preventDefault();

      // 1. If we are NOT on the homepage, navigate to homepage first
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation to complete before scrolling
        setTimeout(() => {
          scrollToSection(to);
        }, 100);
      } else {
        // 2. If we are already on the homepage, just scroll
        scrollToSection(to);
      }
    }
  };

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <NavLink to={to} onClick={handleClick} {...props}>
      {children}
    </NavLink>
  );
}
