import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Sub from "./pages/sub";
import Test from "./pages/test";
import MakeGroup from "./pages/makeGroup";
import GroupDetail from "./pages/groupDetail";
import SuccessRoom from "./pages/successRoom";
import ComeGroup from "./pages/comeGroup";
import Navigation from "./common/navigation";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sub" element={<Sub />} />
        <Route path="/test" element={<Test />} />
        <Route path="/makegroup" element={<MakeGroup />} />
        <Route path="/successroom" element={<SuccessRoom />} />
        <Route path="/comegroup" element={<ComeGroup />} />
        <Route path="/groupdetail" element={<GroupDetail />} />
      </Routes>
      <Navigation />
    </>
  );
}

export default App;
