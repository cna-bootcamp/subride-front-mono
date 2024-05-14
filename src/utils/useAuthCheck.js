// useAuthCheck.js
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'utils/apiInstance';

const useAuthCheck = () => {
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const navigate = useNavigate();

  const fetchVerifyToken = useCallback(async () => {
    const token = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const currentPath = window.location.pathname;

    if (currentPath === "/login" || currentPath === "/signup") {
      setIsTokenVerified(true);
    } else if (token) {
      try {
        const { data } = await api.post("/auth/verify", { token });
        if (data === 1) {
          console.log("TOKEN is Valid !!!");
          setIsTokenVerified(true);
        } else if (data === 10) {
          // Token expires, refresh request
          console.log("***** TOKEN is Expired !!!!");
          const { data: jwtToken } = await api.post("/auth/refresh", {
            refreshToken,
          });
          if (jwtToken.accessToken && jwtToken.refreshToken) {
            sessionStorage.setItem("accessToken", jwtToken.accessToken);
            sessionStorage.setItem("refreshToken", jwtToken.refreshToken);
            console.log("***** TOKEN is Refreshed !!!!");
            setIsTokenVerified(true);
          }
        } else {
          console.log("TOKEN is Invalid !!!!");
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          setIsTokenVerified(false);
          navigate("/login");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        setIsTokenVerified(false);
        navigate("/login");
      }
    } else {
      setIsTokenVerified(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchVerifyToken();
  }, [fetchVerifyToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchVerifyToken();
    }, 60000); // 10분마다 토큰 유효성 검사
    return () => clearInterval(interval);
  }, [fetchVerifyToken]);

  return isTokenVerified;
};

export default useAuthCheck;