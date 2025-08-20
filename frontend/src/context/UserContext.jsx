import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      }
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
