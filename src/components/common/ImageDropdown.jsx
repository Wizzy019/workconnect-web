import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient/supabase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faImage, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';

const ImageDropdown = () => {

  const { user, profile } = useAuth();
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [localError, setLocalError] = useState("");

   const uploadImage = async (file, folder, oldFilePath = null) => {
    

  if (oldFilePath) {
    await supabase.storage
    .from("profile_images").remove([oldFilePath]);
  }

  const ext = file.name.split(".").pop();
  const filePath = `${folder}/${user.id}-${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("profile_images")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("profile_images")
    .getPublicUrl(filePath);

  return { publicUrl: data.publicUrl, filePath };
};

  const addImages = async () => {
  if (!user) return;

  const updates = {};

  if (profileImage) {
    const {publicUrl, filePath} = await uploadImage(profileImage,"profile", profile?.profile_image_path);
    updates.profile_image_url = publicUrl;
    updates.profile_image_path = filePath
  }

  if (coverImage) {
    const {publicUrl, filePath} = await uploadImage(coverImage,"cover", profile?.cover_image_path);
    updates.cover_image_url = publicUrl;
    updates.cover_image_path = filePath
  }

  if (Object.keys(updates).length === 0) return;

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (error) {
    setLocalError(error.message || "Failed to upload image");
  }

  window.location.reload();
};

useEffect(() => {
  if (!profileImage && !coverImage) return;
  addImages();
}, [profileImage, coverImage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-50 bg-white shadow-sm transition-all"
      >
        <FontAwesomeIcon icon={faCamera} className="text-[#1dbf73]" />
        <span>Add / Change Picture</span>
        <FontAwesomeIcon icon={faChevronDown} className={`text-[10px] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in duration-200">
         {/* PROFILE IMAGE BUTTON */}
        <button
        type="button" // FIX: prevent form submission
        onClick={() => profileInputRef.current?.click()} // FIX: click on button, not nested div
        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
        <FontAwesomeIcon icon={faImage} className="text-[#1dbf73] w-4" />
        <div className="flex flex-col items-start">
        <span className="font-bold">Profile Photo</span>
        <span className="text-[11px] text-gray-400">Update your avatar</span>
        </div>
        </button>

       
        <input
        type="file"
        accept="image/*"
        ref={profileInputRef}
        hidden 
        onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
/>


        <button
        type="button" 
        onClick={() => coverInputRef.current?.click()} 
        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
        <FontAwesomeIcon icon={faImage} className="text-[#1dbf73] w-4" />
        <div className="flex flex-col items-start">
        <span className="font-bold">Cover Photo</span>
        <span className="text-[11px] text-gray-400">Update your banner image</span>
        </div>
        </button>


        <input
        type="file"
        accept="image/*"
        ref={coverInputRef}
        hidden 
         onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
        />
        </div>
      )}
    </div>
  );
};

export default ImageDropdown;