import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faUser,
  faLock,
  faEye,
  faEyeSlash,
  faArrowRight,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import FormField from "../../components/common/FormField.jsx";
import Button from "../../components/common/Button.jsx";

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

function Login({ onGoogleClick, onForgotPasswordClick, onSignupClick }) {
  const { login, error } = useAuth();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = await login(formData.email, formData.password);

    if (error) {
      console.log(error.message);
      return;
    }

    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen bg-wc-surface flex flex-col items-center justify-center px-wc-container py-wc-12 font-wc-sans">
      <div className="w-full max-w-wc-content-sm bg-wc-background border border-wc-border rounded-wc-lg shadow-wc-md p-wc-8">
        {/* Brand */}
        <div className="flex flex-col items-center text-center mb-wc-8">
          <FontAwesomeIcon
            icon={faUserGroup}
            className="text-wc-primary text-wc-3xl mb-wc-2"
            aria-hidden="true"
          />
          <span className="text-wc-xl font-wc-semibold text-wc-text-heading">
            WorkConnect
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-wc-8">
          <h1 className="text-wc-2xl font-wc-semibold text-wc-text-heading mb-wc-2">
            Welcome back
          </h1>
          <p className="text-wc-sm text-wc-text">
            Log in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-wc-6">
          <FormField
            id="identifier"
            name="identifier"
            label="Email or Username"
            icon={faUser}
            placeholder="Enter your email or username"
            value={formData.email}
            onChange={handleChange("email")}
            required
          />

          <div className="flex flex-col gap-wc-2">
            <FormField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              icon={faLock}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange("password")}
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-wc-text-muted hover:text-wc-text-heading transition-colors duration-wc-fast"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              }
            />
            <button
              type="button"
              onClick={onForgotPasswordClick}
              className="text-wc-sm font-wc-medium text-wc-primary self-end"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={faArrowRight}
            iconPosition="right"
          >
            Log In
          </Button>
        </form>

        <div className="flex items-center gap-wc-3 my-wc-6">
          <div className="flex-1 border-t border-wc-border" />
          <span className="text-wc-sm text-wc-text-muted">or</span>
          <div className="flex-1 border-t border-wc-border" />
        </div>

        <Button
          variant="secondary"
          size="lg"
          fullWidth
          icon={faGoogle}
          onClick={onGoogleClick}
        >
          Continue with Google
        </Button>
        <p className="text-center text-wc-sm text-wc-text mt-wc-6">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onSignupClick}
            className="font-wc-medium text-wc-primary"
          >
            Sign up
          </button>
        </p>
      </div>

      <div className="flex items-center gap-wc-2 mt-wc-6 text-center">
        <FontAwesomeIcon
          icon={faShieldHalved}
          className="text-wc-primary text-sm shrink-0"
          aria-hidden="true"
        />
        <p className="text-wc-sm text-wc-text">
          Your data is safe with us. We never share your information.
        </p>
      </div>
    </div>
  );
}

export default Login;
