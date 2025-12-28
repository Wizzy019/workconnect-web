import { Link } from "react-router-dom";

function RegisterStep1({ formData, setFormData, next }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    next(); // move to next step
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-80 space-y-3 relative">
      <h2 className="text-2xl font-semibold text-center">Create Account</h2>
      <h3 className="text-xl font-medium my-5 text-center">Step 1 of 3</h3>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName || ""}
        onChange={handleChange}
        required
        className="border p-2 w-full rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email || ""}
        onChange={handleChange}
        required
        className="border p-2 w-full rounded"
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username || ""}
        onChange={handleChange}
        required
        className="border p-2 w-full rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password || ""}
        onChange={handleChange}
        required
        className="border p-2 w-full rounded"
      />

      <button type="submit" className="bg-green-700 text-white p-2 rounded ml-auto">
        Next
      </button>

      <p className="text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterStep1;