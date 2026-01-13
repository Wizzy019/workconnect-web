import Sidebar from '../components/layout/Sidebar'
import { Outlet } from 'react-router-dom'
import Topbar from '../components/layout/Topbar'

function MainLayout() {
  return (
    <div className='w-full bg-[#a3ffcd28] min-h-screen text-pretty'>
        <div className='md:flex md:justify-stretch'>
          <Sidebar />
      <main className='flex flex-col'>
        <Topbar />
        <Outlet />
      </main>
        </div>
    </div>
  )
}

export default MainLayout
