import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../lib/supabaseClient/supabase";

const EditProfileModal = ({
  isOpen,
  onClose,
  initialData,
  onSaveSuccess,
  onError,
}) => {
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [localError, setLocalError] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    skills: [],
    phoneNumber: "",
    age: "",
    availability: "Full-Time",
    bio: "",
    website: "",
    linkedin: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        username: initialData.username || "",
        skills: initialData.skills || [],
        phoneNumber: initialData.phoneNumber || "",
        age: initialData.age || "",
        availability: initialData.availability || "Full-Time",
        bio: initialData.bio || "",
        website: initialData.website || "",
        linkedin: initialData.linkedin || "",
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      const newSkill = skillInput.trim().replace(",", "");
      if (!formData.skills.includes(newSkill)) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, newSkill],
        }));
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const handleSave = async () => {
    setLocalError("");
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("workconnect_profiles")
      .update({
        ...formData,
        updated_at: new Date(),
      })
      .eq("id", user.id);

    if (error) {
      setLocalError(error.message || "erro updating profile");
      onError(error.message);
    } else {
      onSaveSuccess();
      onClose();
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <h3 className="text-red-500">{localError}</h3>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#001e2b]">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-5 custom-scrollbar">
          <div className="space-y-1">
            <label className="text-sm font-bold text-[#001e2b]">
              User Name
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder=""
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-[#1dbf73] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-[#001e2b]">Skills</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-2 border border-gray-200"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-[10px]" />
                  </button>
                </span>
              ))}
            </div>
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              placeholder="Add a skill and press Enter..."
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-[#1dbf73] transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-[#001e2b]">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+1234567890"
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-[#1dbf73] transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-[#001e2b]">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="25"
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-[#1dbf73] transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-[#001e2b]">
              Availability
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-[#1dbf73] transition-all bg-white"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-[#001e2b]">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself..."
              rows="3"
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-[#1dbf73] transition-all resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-[#001e2b]">Website</label>
            <input
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://www.example.com"
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-[#1dbf73] transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-[#001e2b]">LinkedIn</label>
            <input
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              placeholder="https://www.linkedin.com/in/username"
              className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-[#1dbf73] transition-all"
            />
          </div>
        </div>

        <div className="p-6 bg-gray-50 flex gap-4">
          <button
            disabled={loading}
            onClick={handleSave}
            className="flex-1 bg-[#28a745] text-white font-bold py-3 rounded-lg hover:bg-[#218838] transition-all disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-[#e9ecef] text-[#495057] font-bold py-3 rounded-lg hover:bg-[#dee2e6] transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
