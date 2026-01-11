import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const BackButton = ({ to, label, className=""}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`flex items-center gap-2 px-2 py-2 rounded-2xl text-gray-600  hover:text-gray-900 font-medium transition-colors duration-200 group ${className} `}
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 group-hover:bg-green-400 transition-colors">
        <FontAwesomeIcon icon={faArrowLeft} className="text-xs text-white" />
      </div>
      <span>{label}</span>
    </button>
  );
};

export default BackButton;