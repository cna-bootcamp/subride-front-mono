import { useState, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PrivateRouter from "components/PrivateRouter";

import Login from "pages/Auth/Login";
import Signup from "pages/Auth/Signup";
import Main from "pages/Main/Main";

import SubGroupCandidate from "pages/SubGroup/SubGroupCandidate";
import MySubGroup from "pages/SubGroup/MySubGroup";
import GroupDetail from "pages/SubGroup/GroupDetail";
import MakeGroup from "pages/SubGroup/MakeGroup";
import ComeGroup from "pages/SubGroup/ComeGroup";
import SuccessRoom from "pages/SubGroup/SuccessRoom";

import MySubscription from "pages/Subscription/MySubscription";
import ServiceDetail from "pages/Subscription/ServiceDetail";
import Recommend from "pages/Subscription/Recommend";

import useAuthCheck from "utils/useAuthCheck";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const isTokenVerified = useAuthCheck();

  const handleAfterLogin = useCallback((userData) => {
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    navigate("/");
  }, [navigate]);

  return (
    <>
      {isTokenVerified ? (
        <Routes>
          <Route path="/login" element={<Login handleAfterLogin={handleAfterLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRouter isLoggedIn={!!user} />}>
            <Route path="/" element={<Main user={user} />} />
            <Route path="/subgroup-candidate" element={<SubGroupCandidate user={user} />} />
            <Route path="/mysubgroup" element={<MySubGroup user={user} />} />
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