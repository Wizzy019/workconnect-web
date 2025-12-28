import { Link } from "react-router-dom";

function RegisterStep2 ({formData, setFormData, next}){

//   const { updateRegisterData } = useAuth();

//   const navigate = useNavigate();

// const [role, setRole] = useState("frelancer");
// const [skill, setSkill] = useState("");
// const [country, setCountry] = useState("");
// // const [error, setError] = useState("");

  const handleChange = (e) => {
      setFormData({
        ...formData, [e.target.value]: e.target.value,
      });
    };

     const handleSubmit = (e) => {
      e.preventDefault();
    next()

};



  return (
      <form 
      onSubmit={handleSubmit}
       className="flex flex-col w-80 space-y-3 relative">
      <h2 className="text-2xl font-semibold text-center">Create Account</h2>
       <h3 className='text-xl font-medium my-5 text-center'>Step 2 of 3</h3>
      {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

      <select  onChange={handleChange}
      className="border p-2 w-full rounded">
        <option value="freelancer">Frelancer</option>
        <option value="client">Business/Client</option>
      </select>
       <input type="skill" placeholder="Enter your Skill or area of service"
       onChange={handleChange}
      className="border p-2 w-full rounded"
      required
      />
       <input type="text" placeholder="Enter your country name"
       onChange={handleChange}
      className="border p-2 w-full rounded"
      required
      />
      <button type="submit" className="bg-green-700 text-white p-2 rounded ml-auto">Next</button>
      <p className="text-sm text-center">Already have an account?{" "} <Link to="/login" 
      className="text-blue-600 underline">Login</Link> </p>
    </form>
  )
}

export default RegisterStep2
