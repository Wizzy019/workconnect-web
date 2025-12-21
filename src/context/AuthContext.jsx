import { createContext, useContext, useState } from "react";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [registerData, setRegisterData] = useState({});
  const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const updateRegisterData = (data) => {
      setRegisterData(prev => 
      ({ ...prev, ...data }));
    };


    const register = (name, email, username, password, role, skill, country, phoneNumber, referal, idType, id) => {
    console.log("REGISTER FIRED", name, email, username, password, role, skill, country, phoneNumber, referal, idType, id);
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = storedUsers.some((u) => u.email === email);
    if (userExists) {
      return { success: false, message: "Email already registered" };
    }

    const newId = storedUsers.length + 1;

    const newUser = {
      regId: newId,
      ...registerData
    };

    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    return { success: true, message: "Registration successful" };

    }

     const login = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = storedUsers.find((u) => u.email === email);
    if (!existingUser) {
      return { success: false, message: "User does not exist" };
    }

    if (existingUser.password !== password) {
      return { success: false, message: "Incorrect password" };
    }

    setUser(existingUser);
    localStorage.setItem("user", JSON.stringify(existingUser));

    return { success: true, message: "Login successful", user: existingUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, updateRegisterData, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);