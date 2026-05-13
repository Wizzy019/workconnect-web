import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const InputField = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  </div>
);

const Register = () => {
  const { signUp, error } = useAuth();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "freelancer",
    age: "",
    skill: "",
    country: "",
    phoneNumber: "",
    source: "",
    idType: "",
    idNumber: "",
  });
  //   const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (
      step === 1 &&
      (!formData.name || !formData.email || !formData.password)
    ) {
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phoneNumber || !formData.idNumber) return;

    try {
      await signUp(formData);
      navigate(`/dashboard/${formData.role}`);
    } catch (err) {
      err.message;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-1/3 h-2 rounded-full mx-1 ${step >= num ? "bg-green-500" : "bg-gray-200"}`}
            />
          ))}
        </div>
        {error && <p className="text-sm text-red-500 ">{error}</p>}
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Account Details
              </h2>
              <InputField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          )}
          {step === 2 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Profile Info
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="freelancer">Freelancer</option>
                  <option value="client">Client</option>
                </select>
              </div>
              <InputField
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
              />
              {formData.role === "freelancer" && (
                <InputField
                  label="Primary Skill"
                  name="skill"
                  value={formData.skill}
                  onChange={handleChange}
                />
              )}
              <InputField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          )}
          {step === 3 && (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Final Verification
              </h2>
              <InputField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  How did you hear about us?
                </label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select an option</option>
                  <option value="google">Google Search</option>
                  <option value="social">Social Media</option>
                  <option value="friend">Word of Mouth</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  ID Type
                </label>
                <select
                  name="idType"
                  value={formData.idType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select ID Type</option>
                  <option value="passport">Passport</option>
                  <option value="national_id">National ID</option>
                </select>
              </div>
              <InputField
                label="ID Number"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="bg-green-700 text-white p-2 rounded"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            {step < 3 && (
              <button
                type="button"
                className="bg-green-700 text-white p-2 rounded"
                onClick={nextStep}
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                className="bg-green-700 text-white p-2 rounded"
              >
                Register
              </button>
            )}
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already registered?
          <Link to="/login">
            {" "}
            <div className="text-green-600 font-semibold">Go to login</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
