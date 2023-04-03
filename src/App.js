import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Album from "./components/Album";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
           <Route exact path="/dashboard" element={<Dashboard />} />
           <Route exact path="/show-images" element={<Album />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;