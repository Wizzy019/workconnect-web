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
  faEnvelope,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import FormField from "../../components/common/FormField.jsx";
import Button from "../../components/common/Button.jsx";

const ACCOUNT_TYPE_OPTIONS = [
  { value: "", label: "Select your account type", disabled: true },
  { value: "freelancer", label: "Find work" },
  { value: "client", label: "Hire talent" },
];

/**
 * SignupPage
 *
 * "Create your account" — one focused card: full name, email, username,
 * password, and an account-type select, plus primary Create Account
 * action, Google SSO, and a link back to the login page.
 */
export default function SignupPage({ onGoogleClick, onLoginClick }) {
  const { signUp, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "",
  });
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (!formData.email || !formData.name || !formData.password) return;

    try {
      await signUp(formData);
      setSuccess("Success ✔");
      navigate(`/dashboard/${formData.role}`);
    } catch (err) {
      err.message;
    }
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
            Create your account
          </h1>
          <p className="text-wc-sm text-wc-text">
            Join thousands of skilled people and job providers on WorkConnect.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-wc-6">
          {error && <p className="text-sm text-red-500 ">{error}</p>}
          {success && <p className="text-sm text-wc-primary ">{success}</p>}
          <FormField
            id="name"
            name="name"
            label="Full Name"
            icon={faUser}
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange("name")}
            required
          />

          <FormField
            id="email"
            name="email"
            type="email"
            label="Email Address"
            icon={faEnvelope}
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange("email")}
            required
          />

          <FormField
            id="username"
            name="username"
            label="Username"
            icon={faUser}
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange("username")}
            required
          />

          <FormField
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            icon={faLock}
            placeholder="Create a password"
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
          <FormField
            id="role"
            name="role"
            label="I want to..."
            as="select"
            icon={faBriefcase}
            options={ACCOUNT_TYPE_OPTIONS}
            value={formData.role}
            onChange={handleChange("role")}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            icon={faArrowRight}
            iconPosition="right"
          >
            Create Account
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
          Sign up with Google
        </Button>

        <p className="text-center text-wc-sm text-wc-text mt-wc-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onLoginClick}
            className="font-wc-medium text-wc-primary"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
