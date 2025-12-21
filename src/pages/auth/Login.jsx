import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {

  const { login, user } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

   useEffect(() => {
    if(user){
      if(user.role === "client") navigate("/dashboard/client", {replace: true});
      else navigate("/dashboard/worker", {replace: true})
    }
  }, [user, navigate]);


  const handleLogin = (e) => {
  e.preventDefault();

  const result = login(email, password);

  if (!result.success) {
    setError(result.message);
    return; 
  };

  const role = result.user.role;
  if (role === "client") {
    navigate("/dashboard/client", { replace: true });
  } else {
    navigate("/dashboard/worker", { replace: true });
  }
};


  return (
             <form 
            onSubmit={handleLogin}
            className="w-80 space-y-3">
            <h2 className='text-pretty text-3xl font-semibold mb-3'>Login</h2> 

            {error && <p className='text-red-500 text-sm'>{error}</p>}
           <input type="email" placeholder="Email" value={email} 
           onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full rounded"
             required
            />
            <input type="password" placeholder="Password" value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full rounded"
            required
            />
            <button 
             className="bg-green-700 text-white w-full py-2 rounded"
             >Login</button> 
             <p className='text-sm text-center'>Don't have an account?{" "}
              <Link to="/register/step-1" className='text-blue-600 underline'>Register</Link></p>
            </form>
  )
}

export default Login
