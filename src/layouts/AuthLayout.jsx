import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { ScrollToTop } from "../components/common/ScrollToTop";

function AuthLayout() {
  const navigate = useNavigate();
  const goToLogin = () => navigate("/login");
  const goToRegister = () => navigate("/register");

  return (
    <div className="">
      <ScrollToTop />
      <Navbar onGetStartedClick={goToRegister} onLoginClick={goToLogin} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AuthLayout;
