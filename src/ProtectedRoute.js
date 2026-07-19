import { Navigate } from "react-router-dom";
import { useMe } from "./hooks/useAuth";

export default function ProtectedRoute({ children, roles }) {
  const { data: user, isPending } = useMe();

  if (isPending) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.data.role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
