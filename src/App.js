import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Test from "./pages/test";
import MakeGroup from "./pages/makeGroup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/test" element={<Test />} />
      <Route path="/makeGroup" element={<MakeGroup />} />
    </Routes>
  );
}

export default App;
