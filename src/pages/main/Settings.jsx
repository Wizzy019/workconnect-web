import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import KYCModal from '../../components/common/KYCModal';
import ChangePasswordModal from '../../components/common/ChangePasswordModal';
import { useAuth } from '../../context/AuthContext';
import BackButton from '../../components/common/BackButton';
import { useNavigate } from 'react-router-dom';

const Settings = () => {

    const { logout } = useAuth();
    const navigate = useNavigate();

  const [isKYCOpen, setIsKYCOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f3f7f9]">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <BackButton />
          <h2 className="text-xl font-bold text-[#001e2b]">Settings</h2>
          <div className="w-6"></div>
        </div>

        <div className="divide-y divide-gray-100">
          <button 
            onClick={() => setIsKYCOpen(true)}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group text-left"
          >
            <div>
              <h3 className="font-bold text-[#001e2b]">Complete KYC</h3>
              <p className="text-sm text-gray-500 mt-0.5">Update your personal information</p>
            </div>
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-300 group-hover:text-[#1dbf73]" />
          </button>

          <button 
            onClick={() => setIsPasswordOpen(true)}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group text-left"
          >
            <div>
              <h3 className="font-bold text-[#001e2b]">Change Password</h3>
              <p className="text-sm text-gray-500 mt-0.5">Update your account password</p>
            </div>
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-300 group-hover:text-[#1dbf73]" />
          </button>

          <div className="p-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Notifications</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Email Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#1dbf73] after:content-[''] after:absolute 
                   after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Push Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#1dbf73] after:content-[''] after:absolute 
                   after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="p-6"  onClick={handleLogout}>
            <button className="w-full p-4 border border-gray-200 bg-white rounded-xl text-[#f40202] font-bold hover:bg-red-50 transition-all text-center">
              Logout
            </button>
          </div>
        </div>
      </div>

      <KYCModal isOpen={isKYCOpen} onClose={() => setIsKYCOpen(false)} />
      <ChangePasswordModal isOpen={isPasswordOpen} onClose={() => setIsPasswordOpen(false)} />
    </div>
  );
};

export default Settings;