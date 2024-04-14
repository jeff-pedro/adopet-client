// dependencies
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api";

export default function useAuth() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredToken = localStorage.getItem("token");
    const recoveredUser = localStorage.getItem("user");

    if (recoveredToken) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(recoveredToken)}`;
      setUser(recoveredUser);
    }

    // to avoid page loading without properly gathering the user info from localStorage, we must use a state to wait for it. When the data fetch is ended, then we set Loading to false and then we render the page (this last one is made on Routes file)
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // call api
    try {
      const {
        data: { accessToken, user },
      } = await api.post("/api/login", { email, password });

      localStorage.setItem("token", JSON.stringify(accessToken));
      localStorage.setItem("user", JSON.stringify(user));
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;

      setUser(user);

      navigate("/home");
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    api.defaults.headers.Authorization = undefined;
    navigate("/");
  };

  return { user, loading, login, logout };
}
