import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Sub from "./pages/sub";
import MySub from "./pages/mySub";
import Test from "./pages/test";
import MakeGroup from "./pages/makeGroup";
import GroupDetail from "./pages/groupDetail";
import SuccessRoom from "./pages/successRoom";
import ComeGroup from "./pages/comeGroup";
import Login from "./pages/login";
import MySubscription from "./pages/mySubscription";
import Recommend from './pages/recommend'
import PrivateRoute from "./pages/privateRouter";
import Navigation from "./common/navigation";

function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  return (
    <>
      <Routes>
        <Route element={<PrivateRoute isLoggedIn={user} />}>
          <Route path="/" element={<Main user={user} />} />
          <Route path="/sub" element={<Sub user={user}/>} />
          <Route path="/mysub" element={<MySub user={user}/>} />
          <Route path="/test" element={<Test />} />
          <Route path="/makegroup" element={<MakeGroup />} />
          <Route path="/successroom" element={<SuccessRoom />} />
          <Route path="/comegroup" element={<ComeGroup />} />
          <Route path="/mysubscription" element={<MySubscription user={user}/>} />
          <Route path="/groupdetail" element={<GroupDetail />} />
          <Route path="/recommend" element={<Recommend user={user}/>} />
        </Route>
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
      <Navigation />
    </>
  );
}

export default App;
