import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import PreviewImage from "./components/PreviewImage/PreviewImage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview/:id" element={<PreviewImage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
