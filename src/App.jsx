import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import MainLayout from './layouts/MainLayout'
import WorkerDashboard from './pages/main/WorkerDashboard'
import ClientDashboard from './pages/main/ClientDashboard'
import Jobs from './pages/main/Jobs'
import ProtectedRoute from './routes/ProtectedRoute'
import Register from './pages/auth/Register'
import MyJobsList from './components/job/MyJobsList'
import PostJobForm from './components/job/PostJobForm'
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
        <Route path='/myjobs' element={<ProtectedRoute><MyJobsList /></ProtectedRoute>}/>
        <Route path='/postjob' element={<PostJobForm />} />
      </Routes>
  )
}

export default App
