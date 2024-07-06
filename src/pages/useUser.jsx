import { useQuery } from "@tanstack/react-query";
import { useState, createContext, useContext } from "react";

import { useEffect } from "react";
import { auth } from "./api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const { data, refetch } = useQuery({
    queryKey: ["loginUser"],
    queryFn: () => auth.currentUser(JSON.parse(localStorage.getItem("uid"))),
    refetchOnWindowFocus: false,
    enabled: !!JSON.parse(localStorage.getItem("uid")) && user == null,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return (
    <UserContext.Provider value={{ user, setUser, refetch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export default useUser;
