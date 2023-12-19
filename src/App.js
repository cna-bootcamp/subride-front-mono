import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Sub from "./pages/sub";
import Test from "./pages/test";
import MakeGroup from "./pages/makeGroup";
import SuccessRoom from "./pages/successRoom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sub" element={<Sub />} />
      <Route path="/test" element={<Test />} />
      <Route path="/makegroup" element={<MakeGroup />} />
      <Route path="/successroom" element={<SuccessRoom />} />
    </Routes>
  );
}

export default App;
