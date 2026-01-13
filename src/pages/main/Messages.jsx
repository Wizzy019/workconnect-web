import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCommentDots, 
  faSearch, 
  faPlusCircle 
} from '@fortawesome/free-solid-svg-icons';
import BackButton from '../../components/common/BackButton';

const Messages = () => {
  
  const [messages, setMessages] = useState([]);

  return (
    <div className="min-h-screen bg-[#f3f7f9]">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm border-x border-gray-100 flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between mb-4">
            <BackButton />
            <h2 className="text-xl font-bold text-[#001e2b]">Messages</h2>
            <button className="text-[#1dbf73] hover:text-[#19a463]">
              <FontAwesomeIcon icon={faPlusCircle} size="lg" />
            </button>
          </div>

          <div className="relative">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" 
            />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none focus:border-[#1dbf73] transition-all"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {messages.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {messages.map((msg, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#001e2b]">User Name</span>
                        <span className="text-[10px] text-gray-400">12:45 PM</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        Message preview text goes here...
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <FontAwesomeIcon 
                  icon={faCommentDots} 
                  className="text-4xl text-[#1dbf73] opacity-40" 
                />
              </div>
              <h3 className="text-lg font-bold text-[#001e2b]">No messages yet</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                When you start a conversation with a client or talent, your messages will appear here.
              </p>
              <button 
                onClick={() => setMessages([{}])}
                className="mt-8 px-8 py-3 bg-[#1dbf73] text-white font-bold rounded-xl hover:bg-[#19a463] shadow-md transition-all"
              >
                Start a conversation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
