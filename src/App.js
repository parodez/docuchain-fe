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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Requests2 from "./pages/js/Requests2";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/requestor" element={<RequestorLogin />} />
          <Route path="/requestor/dashboard" element={<RequestorDashboard />} />

          <Route element={<MasterLayout />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/requests" element={<Requests />} />
            {/* <Route path="/requests" element={<Requests2 />} /> */}
            <Route path="/documents" element={<Documents />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
