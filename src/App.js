import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Sub from "./pages/sub";
import Test from "./pages/test";
import MakeGroup from "./pages/makeGroup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sub" element={<Sub />} />
      <Route path="/test" element={<Test />} />
      <Route path="/makeGroup" element={<MakeGroup />} />
    </Routes>
  );
}

export default App;
