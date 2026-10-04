import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Insights from "./pages/Insights";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
