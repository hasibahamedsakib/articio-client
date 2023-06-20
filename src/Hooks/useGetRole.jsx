import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useGetRole = () => {
  const [role, setRole] = useState("");
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");
  const URL = `https://articio-server.vercel.app/getStudents/${user?.email}`;

  useEffect(() => {
    if (user) {
      const fetchRole = async () => {
        try {
          const res = await fetch(URL, {
            headers: {
              Authorization: `Bearer ${token}`,
              "content-type": "application/json",
            },
          });

          const data = await res.json();

          setRole(data[0]?.role);
        } catch (error) {
          // Handle error here
          console.error("Error fetching role:", error);
          setRole(null); // or throw an error if appropriate
        }
      };

      fetchRole();
    }
  }, [URL, token, user]);

  return role;
};

export default useGetRole;
