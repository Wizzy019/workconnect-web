import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient/supabase";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const PostJobForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [localError, setLocalError] = useState(null);
  const [success, setSucces] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    skills: [],
    client_id: "",
    status: "",
  });

  const handleChange = (e) => {
    setLocalError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLocalError(null);

    const { error } = await supabase.from("workconnect_opportunities").insert({
      title: formData.title,
      description: formData.description,
      budget: parseFloat(formData.budget),
      deadline: formData.deadline || null,
      skills: formData.skills || [],
      client_id: user.id,
      status: "open",
    });

    if (error) {
      console.log(error);
      setLocalError(error.message);
      setLoading(false);
    } else {
      setSucces("Job posted successfully");
      navigate("/myjobs");
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a New Job</h2>

      {localError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {localError}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-green-600 rounded-lg text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            required
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            required
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget (₦)
            </label>
            <input
              required
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
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

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg disabled:opacity-50 transition shadow-sm"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobForm;
