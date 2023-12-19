import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Sub from "./pages/sub";
import Test from "./pages/test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sub" element={<Sub />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
