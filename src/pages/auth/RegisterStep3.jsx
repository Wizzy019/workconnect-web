import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


function RegisterStep3() {

  const { updateRegisterData, register } = useAuth();

  const navigate = useNavigate();
  

const [phoneNumber, setPhoneNumber] = useState("");
const [referal, setReferal] = useState("");
const [idType, setIdType] = useState("");
const [id, setId] = useState("");
const [error, setError] = useState("");

 
const handleRegister = (e) =>{
  e.preventDefault();

   updateRegisterData({phoneNumber, referal, idType, id});
  
  const result = register();

   if(!result.success) {
        setError(result.message);
        return;
      };


    setTimeout(() => {
      navigate("/login")
    }, 1500);
    
}

  return (
    <form onSubmit={handleRegister} className="flex flex-col w-80 space-y-3 relative">
      <h2 className="text-2xl font-semibold text-center">Create Account</h2>
      <h3 className='text-xl font-medium my-5 text-center'>Step 3 of 3</h3>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required 
      className="border p-2 w-full rounded" placeholder="Enter your Phone number"
      />
    <select  value={referal} onChange={(e) => setReferal(e.target.value)}
      className="border p-2 w-full rounded">
        <option value="friend">Friend</option>
        <option value="online">Online</option>
        <option value="others">Others</option>
    </select>
    <select  value={idType} onChange={(e) => setIdType(e.target.value)}
      className="border p-2 w-full rounded">
        <option value="">Enter verification type</option>
        <option value="id card">ID Card</option>
        <option value="passport">Passport</option>
        <option value="license">Drivers Lincense</option>
        <option value="voter-"></option>
    </select>
    <input type="text" value={id} onChange={(e) => setId(e.target.value)} required
    className="border p-2 w-full rounded" placeholder="Enter your ID number"/>
    <button className="bg-green-700 text-white w-full py-2 rounded">Register</button> 
    </form>
  )
}

export default RegisterStep3
