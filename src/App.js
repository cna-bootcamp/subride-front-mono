import { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./pages/main";
import Sub from "./pages/sub";
import MySub from "./pages/mySub";
import MakeGroup from "./pages/makeGroup";
import GroupDetail from "./pages/groupDetail";
import SuccessRoom from "./pages/successRoom";
import ComeGroup from "./pages/comeGroup";
import Login from "./pages/login";
import Signup from "./pages/signup";
import MySubscription from "./pages/mySubscription";
import Recommend from "./pages/recommend";
import PrivateRoute from "./pages/privateRouter";
import ServiceDetail from "./pages/serviceDetail";
import { ToastContainer } from "react-toastify";
import api from "./utils/apiInstance";

function App() {
  const [user, setUser] = useState(null);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const navigate = useNavigate();

  const handleAfterLogin = useCallback((userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsTokenVerified(true);
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
    }, 60000); // Check for token expiration every 10 minutes
    return () => clearInterval(interval);
  }, [fetchVerifyToken]);

  return (
    <>
      {isTokenVerified ? (
        <Routes>
          <Route path="/login" element={<Login handleAfterLogin={handleAfterLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute isLoggedIn={!!user} />}>
            <Route path="/" element={<Main user={user} />} />
            <Route path="/sub" element={<Sub user={user} />} />
            <Route path="/mysub" element={<MySub user={user} />} />
            <Route path="/makegroup" element={<MakeGroup user={user} />} />
            <Route path="/successroom" element={<SuccessRoom />} />
            <Route path="/comegroup" element={<ComeGroup />} />
            <Route
              path="/mysubscription"
              element={<MySubscription user={user} />}
            />
            <Route path="/groupdetail" element={<GroupDetail user={user} />} />
            <Route path="/recommend" element={<Recommend user={user} />} />
            <Route
              path="/service/:serviceId"
              element={<ServiceDetail user={user} />}
            />
          </Route>
        </Routes>
      ) : (
        <div>Loading...</div>
      )}
      <div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;