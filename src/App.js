import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/js/Login";
import MasterLayout from "./pages/js/MasterLayout";
import Dashboard from "./pages/js/Dashboard";
import Requests from "./pages/js/Requests";
import Documents from "./pages/js/Documents";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<MasterLayout />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/documents" element={<Documents />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
