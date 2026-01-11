import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
 faEdit, faMapMarkerAlt, faEnvelope, 
  faPhone, faGlobe, faChevronDown 
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabaseClient/supabase';
import BackButton from '../../components/common/BackButton';
import ImageDropdown from '../../components/common/ImageDropdown';

const Profile = () => {

    const { user } = useAuth();
    const [userProfile, setUserProfile] = useState([]);
    const [loading, setLoading] = useState(true);
    const [localError, setLocalError] = useState("");
    const [succes, setSuccces] = useState("")
    const fetchData = async () =>{

        setLoading(true);

        if(user){
            const { data: profileData } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .select()

            setUserProfile(profileData);
        }
        setLoading(false)
    }

     useEffect(() => {
        fetchData();
      }, []);
    
      if(loading) return <div>loading...</div>

  const profile = userProfile[0];

  return (
    <div className="min-h-screen bg-[#f3f7f9] pb-12">
         <BackButton className="absolute z-20" />
      <div className="h-64 w-full relative">
        <img 
          src={profile.cover_image_url} 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative -mt-24 bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-100">
            <div className='text-center font-medium'>
                <div className='text-red-500'>{localError}</div>
                <div className='text-green-500'>{succes}</div>
            </div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
               <img 
                src={profile.profile_image_url} 
                alt={profile.name} 
                className="w-full h-full object-cover"
            />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left pt-2">
              <h1 className="text-3xl font-bold text-[#001e2b]">{profile.name}</h1>
              <p className="text-lg text-gray-600 font-medium">{profile.title}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-gray-500 text-sm">
                <div className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#1dbf73]" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FontAwesomeIcon icon={faEnvelope} className="text-[#1dbf73]" />
                  <span>{profile.email}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <ImageDropdown onError={setLocalError} onSucces={setSuccces}/>
              <div className="flex items-center">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#1dbf73] text-white rounded-l-md text-sm font-semibold hover:bg-[#19a463] transition-all">
                  <FontAwesomeIcon icon={faEdit} />
                  Edit Profile
                </button>
                <button className="px-3 py-2 bg-[#1dbf73] text-white border-l border-[#19a463] rounded-r-md hover:bg-[#19a463] transition-all">
                  <FontAwesomeIcon icon={faChevronDown} className="text-[10px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-[#001e2b] mb-4 border-b border-gray-100 pb-2">About Me</h2>
            <p className="text-gray-600 leading-relaxed italic">
              {profile.bio}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-[#001e2b] mb-4 border-b border-gray-100 pb-2">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <FontAwesomeIcon icon={faEnvelope} className="w-5 text-[#1dbf73]" />
                <span className="text-gray-700 font-medium">Email: <span className="text-[#1dbf73]">{profile.email}</span></span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FontAwesomeIcon icon={faPhone} className="w-5 text-[#1dbf73]" />
                <span className="text-gray-700 font-medium">Phone: +234{profile.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FontAwesomeIcon icon={faGlobe} className="w-5 text-[#1dbf73]" />
                <span className="text-gray-700 font-medium">Website: <span className="text-[#1dbf73]">{profile.website}</span></span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FontAwesomeIcon icon={faLinkedin} className="w-5 text-[#1dbf73]" />
                <span className="text-gray-700 font-medium">LinkedIn: <span className="text-[#1dbf73]">{profile.linkedin}</span></span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-[#001e2b] mb-4 border-b border-gray-100 pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills?.map(skill => (
                <span key={skill} className="px-4 py-1.5 bg-[#f0f3f2] text-[#404145] rounded-full text-xs font-semibold border border-gray-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-[#001e2b] mb-4 border-b border-gray-100 pb-2">Recent Projects</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
