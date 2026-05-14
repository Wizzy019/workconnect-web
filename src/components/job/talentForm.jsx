import React, { useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faImage } from "@fortawesome/free-solid-svg-icons";
import BackButton from "../common/BackButton";
import { useAuth } from "../../context/AuthContext";

const TalentForm = () => {
  const { user, profile } = useAuth();

  const coverInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [localError, setLocalError] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [succes, setSuccces] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    title: "",
    description: "",
    profile_image_url: "",
    cover_image_url: "",
    starting_price: "0",
    skills: [],
    is_vetted: false,
    offers_consultation: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addSkill = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, skillInput.trim()],
        }));
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const profileImageUrl = profile.profile_image_url;

  const uploadImage = async (file, folder) => {
    const ext = file.name.split(".").pop();
    const filePath = `${folder}/${user.id}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("workconnect_talents")
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("workconnect_talents")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let coverImageUrl = null;

    if (coverImage) {
      coverImageUrl = await uploadImage(coverImage, "cover");
    }

    const { error } = await supabase.from("workconnect_talents").insert([
      {
        ...formData,
        worker_id: user?.id,
        profile_image_url: profileImageUrl,
        cover_image_url: coverImageUrl,
        rating: 5.0,
        reviews_count: 0,
        starting_price: parseFloat(formData.starting_price),
      },
    ]);

    if (error) {
      setLocalError("Unable to submit", error.message);
      console.log(error.message);
    } else setLocalError("");
    setSuccces("Talent added successfully!");
    setLoading(false);
  };

  const role = profile?.role;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white min-h-screen">
      <div className="flex items-center mb-8">
        <BackButton to={`/dashboard/${role}`} />
        <h1 className="flex-1 text-center text-3xl font-bold text-[#001e2b] mr-8">
          Add Talent
        </h1>
      </div>
      <div className="text-center">
        {localError && <div className="text-xl text-red-500">{localError}</div>}
        {succes && <div className="text-xl text-green-500">{succes}</div>}
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
            <img
              src={profileImageUrl || null}
              className="w-full h-full rounded-full object-cover"
              alt="Profile"
            />
          </div>

          <div className="flex flex-col gap-2 w-full items-center">
            <div className="flex">
              <button
                type="button"
                className="flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                <FontAwesomeIcon
                  icon={faImage}
                  className="text-[#1dbf73]"
                  onClick={() => coverInputRef.current?.click()}
                />
                Upload Cover Image
              </button>
              <input
                type="file"
                accept="image/*"
                ref={coverInputRef}
                onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                className="w-1/3 flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <label className="text-[15px] font-semibold text-gray-800">
              Full Name
            </label>
            <input
              name="full_name"
              placeholder="Enter full name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:border-[#1dbf73] outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[15px] font-semibold text-gray-800">
              Title
            </label>
            <input
              name="title"
              placeholder="Enter talent title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:border-[#1dbf73] outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[15px] font-semibold text-gray-800">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Describe your services and expertise"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:border-[#1dbf73] outline-none transition-all placeholder:text-gray-400 resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[15px] font-semibold text-gray-800">
              Skills
            </label>
            <input
              value={skillInput}
              onKeyDown={addSkill}
              onChange={(e) => setSkillInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:border-[#1dbf73] outline-none transition-all placeholder:text-gray-400"
              placeholder="(e.g., PHP, Laravel, Node.js)"
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-[#e4edff] text-[#404145] px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FontAwesomeIcon icon={faTimes} size="xs" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold text-gray-800">
              Vetted Pro
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="is_vetted"
                checked={formData.is_vetted}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1dbf73]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold text-gray-800">
              Offers Video Consultations
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="offers_consultation"
                checked={formData.offers_consultation}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1dbf73]"></div>
            </label>
          </div>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full py-4 bg-[#1dbf73] text-white font-bold rounded-lg hover:bg-[#19a463] transition-colors disabled:opacity-50 mt-4 text-lg"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default TalentForm;
