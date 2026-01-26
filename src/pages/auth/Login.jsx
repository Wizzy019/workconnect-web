import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const InputField = ({ label, name, type = "text", value, placeholder, onChange }) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-1">{label}</label>
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

function Login() {

const { login, error } = useAuth();

  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  const role = await login(email, password);
  navigate(`/dashboard/${role}`);
};


  return (
             <form 
            onSubmit={handleLogin}
            className="w-80 space-y-3">
            <h2 className='text-pretty text-3xl font-semibold mb-3'>Login</h2> 

            {error && <p className='text-red-500 text-sm'>{error}</p>}
            <InputField label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputField label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button 
             className="bg-[#1dbf73] text-white w-full py-2 rounded"
             >Login</button> 
             <p className='text-sm text-center'>Don't have an account?{" "}
              <Link to="/register" className='text-green-600 font-semibold'>Register</Link></p>``
            </form>
  )
}

export default Login
