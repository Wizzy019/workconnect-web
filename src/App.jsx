import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import RegisterStep1 from './pages/auth/RegisterStep1'
import RegisterStep2 from './pages/auth/RegisterStep2'
import RegisterStep3 from './pages/auth/RegisterStep3'
import MainLayout from './layouts/MainLayout'
import WorkerDashboard from './pages/main/WorkerDashboard'
import ClientDashboard from './pages/main/ClientDashboard'
import Jobs from './pages/main/Jobs'
import ProtectedRoute from './routes/ProtectedRoute'
import Navbar from './components/layout/Navbar'
import Register from './pages/auth/Register'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<AuthLayout />} >
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register/>} />
         </Route>
          <Route element={<MainLayout />} >
            <Route path='/dashboard/freelancer' element={<ProtectedRoute><WorkerDashboard /></ProtectedRoute>} />
            <Route path='/dashboard/client' element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
         </Route>
        <Route path='/joblist' element={<Jobs />} />
      </Routes>
  )
}

export default App
