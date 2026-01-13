import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, faIdCard, faPassport, 
  faUserShield, faCloudUploadAlt, faCheckCircle 
} from '@fortawesome/free-solid-svg-icons';

const KYCModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState('National ID');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUserShield} className="text-[#1dbf73]" />
            <h2 className="text-lg font-bold text-[#001e2b]">Identity Verification</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-500 text-sm">Select a document type to verify your identity and unlock more features.</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'National ID', icon: faIdCard, desc: 'Government issued ID card' },
                  { id: 'Passport', icon: faPassport, desc: 'International travel document' },
                  { id: 'Drivers License', icon: faIdCard, desc: 'Official driving permit' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDocType(item.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                      docType === item.id 
                      ? 'border-[#1dbf73] bg-green-50' 
                      : 'border-gray-100 hover:border-gray-200 bg-white'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      docType === item.id ? 'bg-[#1dbf73] text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <FontAwesomeIcon icon={item.icon} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-[#001e2b] text-sm">{item.id}</h4>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                    {docType === item.id && (
                      <FontAwesomeIcon icon={faCheckCircle} className="text-[#1dbf73]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center py-4">
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center hover:border-[#1dbf73] transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-50 transition-colors">
                  <FontAwesomeIcon icon={faCloudUploadAlt} className="text-3xl text-gray-300 group-hover:text-[#1dbf73]" />
                </div>
                <h4 className="font-bold text-[#001e2b]">Upload {docType}</h4>
                <p className="text-xs text-gray-400 mt-1 px-4">Ensure the document photo is clear and all details are visible.</p>
                <input type="file" className="hidden" />
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-400 justify-center">
                <FontAwesomeIcon icon={faUserShield} />
                <span>Your data is encrypted and securely stored</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 flex gap-3">
          {step === 2 && (
            <button 
              onClick={() => setStep(1)}
              className="flex-1 bg-white border border-gray-200 text-gray-600 font-bold py-3 rounded-lg hover:bg-gray-100 transition-all"
            >
              Back
            </button>
          )}
          <button 
            onClick={() => step === 1 ? setStep(2) : onClose()}
            className="flex-1 bg-[#1dbf73] text-white font-bold py-3 rounded-lg hover:bg-[#19a463] shadow-md transition-all"
          >
            {step === 1 ? 'Continue' : 'Submit for Review'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCModal;