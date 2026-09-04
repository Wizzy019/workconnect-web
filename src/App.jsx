import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import MainLayout from "./layouts/MainLayout";
import WorkerDashboard from "./pages/main/WorkerDashboard";
import ClientDashboard from "./pages/main/ClientDashboard";
import Jobs from "./pages/main/Jobs";
import ProtectedRoute from "./routes/ProtectedRoute";
import Register from "./pages/auth/Register";
import MyJobsList from "./components/job/MyJobsList";
import PostJobForm from "./components/job/PostJobForm";
import TalentList from "./components/job/talentList";
import TalentForm from "./components/job/talentForm";
import MyTasks from "./pages/main/MyTasks";
import Profile from "./pages/main/profile";
import Settings from "./pages/main/Settings";
import Wallet from "./pages/main/Wallet";
import Messages from "./pages/main/Messages";
// import Whatever from "./utils/Whatever";
function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route
          path="/dashboard/freelancer"
          element={
            <ProtectedRoute>
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/client"
          element={
            <ProtectedRoute>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/joblist" element={<Jobs />} />
      <Route
        path="/myjobs"
        element={
          <ProtectedRoute>
            <MyJobsList />
          </ProtectedRoute>
        }
      />
      <Route path="/postjob" element={<PostJobForm />} />
      <Route path="postgig" element={<TalentForm />} />
      <Route path="/talents" element={<TalentList />} />
      <Route
        path="/mytasks"
        element={
          <ProtectedRoute>
            <MyTasks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wallet"
        element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
