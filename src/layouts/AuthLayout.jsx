import { Outlet } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"


function AuthLayout() {
  return (
    <div className="min h-screen flex flex-col items-center justify-between bg-[#effff4]">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AuthLayout
