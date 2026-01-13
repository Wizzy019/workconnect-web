import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faUser, 
  faChevronDown, 
  faChevronUp, 
  faPaperPlane 
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
const bgColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-yellow-500'
];

const OpportunityCard = ({ 
  opportunity, 
  variant = "compact", 
  randomBg = false,
  onOpen 
}) => {

  const { profile } = useAuth();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [proposal, setProposal] = useState('');
  const [delivery, setDelivery] = useState('');
  const [amount, setAmount] = useState('');

  const bgColor = randomBg ? bgColors[Math.floor(Math.random() * bgColors.length)] : 'bg-white';

  const handleApply = (e) => {
    e.stopPropagation();
    setShowApplyModal(true);
  };

  const submitProposal = () => {
    setShowApplyModal(false);
  };
  
  return (
    <>
      <div className={`${bgColor} rounded-2xl shadow-sm border border-gray-100 p-5 transition-all duration-300`}>
        <div className="flex flex-wrap justify-between items-start mb-3">
          <h3 className={`font-bold ${variant === "compact" ? "text-white text-3xl" : "text-[#001e2b] text-lg"}`}>{opportunity.title}</h3>
          <span className={`font-bold ${variant === "compact" ? "text-white text-xl" : "text-[#1dbf73] text-lg"}`}> ₦{opportunity.budget}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {(opportunity.skills || []).slice(0, variant === "compact" ? 3 : undefined).map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-white/60 border border-gray-200 rounded-md text-[11px] font-semibold text-gray-600 uppercase">
              {skill}
            </span>
          ))}
        </div>

        {variant === "compact" ? (
          <button 
            onClick={() => onOpen?.(opportunity)}
            className="w-full py-2.5 bg-[#1dbf73] text-white font-bold rounded-xl text-sm hover:bg-[#19a463] transition-colors"
          >
            Open
          </button>
        ) : (
          <div className="space-y-4">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#1dbf73]"
            >
              {isExpanded ? 'Collapse' : 'View'}
              <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} className="text-[10px]" />
            </button>

            {isExpanded && (
              <div className="pt-4 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{opportunity.description}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <img src={opportunity.client.profile_image_url} alt={<FontAwesomeIcon icon={faUser}/>}
                    className='size-7 rounded-full'
                    />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Posted by</p>
                      <p className="text-sm font-bold text-[#001e2b]">{opportunity.client.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className="text-[#1dbf73] text-xs" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Deadline</p>
                      <p className="text-sm font-bold text-[#001e2b]">{opportunity.deadline}</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleApply}
                  className="w-full py-3 bg-[#1dbf73] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#19a463]"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Apply
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showApplyModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img src={profile.profile_image_url} alt="Profile" />
              </div>
              <div>
                <h4 className="font-bold text-[#001e2b]">{profile.name}</h4>
                <p className="text-xs text-gray-400">Applying for {opportunity.title}</p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Proposal / Cover Letter</label>
                <textarea 
                  rows="4"
                  className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#1dbf73] text-sm resize-none"
                  placeholder="Explain why you are the best fit..."
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Delivery Time</label>
                  <input 
                    type="text"
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#1dbf73] text-sm"
                    placeholder="e.g. 5 days"
                    value={delivery}
                    onChange={(e) => setDelivery(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Proposed Amount(₦)</label>
                  <input 
                    type="text"
                    className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#1dbf73] text-sm"
                    placeholder={opportunity.budget}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex gap-3">
              <button 
                onClick={submitProposal}
                className="flex-1 bg-[#1dbf73] text-white font-bold py-3 rounded-xl hover:bg-[#19a463]"
              >
                Submit Proposal
              </button>
              <button 
                onClick={() => setShowApplyModal(false)}
                className="flex-1 bg-white border border-gray-200 text-gray-500 font-bold py-3 rounded-xl hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OpportunityCard;