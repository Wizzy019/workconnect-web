import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function RegisterStep1() {

  const { updateRegisterData } = useAuth();

  const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState("");


     const handleSubmit = (e) => {
      e.preventDefault();

      updateRegisterData({name, email, username, password});

      // if(!result.success) {
      //   setError(result.message);
      //   return;
      // };
      navigate("/register/step-2")
    }

  return (
      <form 
      onSubmit={handleSubmit}
       className="flex flex-col w-80 space-y-3 relative">
      <h2 className="text-2xl font-semibold text-center">Create Account</h2>
       <h3 className='text-xl font-medium my-5 text-center'>Step 1 of 3</h3>
      {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

      <input type="text" placeholder="Full Name" value={name} 
      onChange={(e) => setName(e.target.value)}
      className="border p-2 w-full rounded"
      required
      />
       <input type="email" placeholder="Email" value={email} 
       onChange={(e) => setEmail(e.target.value)}
      className="border p-2 w-full rounded"
      required
      />
       <input type="text" placeholder="Username" value={username} 
       onChange={(e) => setUsername(e.target.value)}
      className="border p-2 w-full rounded"
      required
      />
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required
    className="border p-2 w-full rounded" placeholder="Enter Password"
    />
      <button type="submit" className="bg-green-700 text-white p-2 rounded ml-auto">Next</button>
      <p className="text-sm text-center">Already have an account?{" "} <Link to="/login" 
      className="text-blue-600 underline">Login</Link> </p>
    </form>
  )
}

export default RegisterStep1