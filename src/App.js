import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/js/Login";
import MasterLayout from "./pages/js/MasterLayout";
import Dashboard from "./pages/js/Dashboard";
import Requests from "./pages/js/Requests";
import Documents from "./pages/js/Documents";
import RequestorLogin from "./pages/js/RequestorLogin";
import RequestorDashboard from "./pages/js/RequestorDashboard";
import Requests2 from "./pages/js/Requests2";
import { Toaster } from "sonner";
import ProtectedRoute from "./ProtectedRoute";
import RequestorLayout from "./pages/js/RequestorLayout";
import RequestorRequestPage from "./pages/js/RequestorRequestPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/requestor" element={<RequestorLogin />} />

          <Route
            element={
              <ProtectedRoute roles={["Requestor"]}>
                <RequestorLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/requestor/dashboard"
              element={<RequestorDashboard />}
            />
            <Route
              path="/requestor/new-request"
              element={<RequestorRequestPage />}
            />
          </Route>

          <Route
            element={
              <ProtectedRoute roles={["Admin", "Teacher", "Registrar"]}>
                <MasterLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<Dashboard />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/documents" element={<Documents />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Route>
        </Routes>
      </Router>
      <Toaster richColors />
    </>
  );
}

export default App;
