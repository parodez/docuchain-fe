import { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem("token");
}

export function getUserFromToken() {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token); // contains role, email, etc.
  } catch (err) {
    return null;
  }
}

export function getUserRole() {
  const user = getUserFromToken();
  return user?.role || null;
}

export function isLoggedIn() {
  return !!getToken();
}
