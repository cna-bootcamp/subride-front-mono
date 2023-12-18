import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Test from "./pages/test";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
