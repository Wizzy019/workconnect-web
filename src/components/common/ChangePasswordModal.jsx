import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes} from '@fortawesome/free-solid-svg-icons';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ old: '', new: '', confirm: '' });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#001e2b]">Change Password</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><FontAwesomeIcon icon={faTimes} /></button>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Current Password</label>
            <input 
              type="password"
              className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#1dbf73]"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">New Password</label>
            <input 
              type="password"
              className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#1dbf73]"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Confirm Password</label>
            <input 
              type="password"
              className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#1dbf73]"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex gap-3">
          <button className="flex-1 bg-[#1dbf73] text-white font-bold py-3 rounded-lg hover:bg-[#19a463]">Update</button>
          <button onClick={onClose} className="flex-1 bg-white border border-gray-200 text-gray-600 font-bold py-3 rounded-lg">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;