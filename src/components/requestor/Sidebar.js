import { LayoutDashboard, LogOutIcon, PlusCircleIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";

const Sidebar = () => {
  const { mutate: logout } = useLogout();

  return (
    <div className="flex flex-col max-w-72 w-full border-r h-full bg-white">
      <div className="p-4 space-y-10">
        <div className="flex items-center gap-4">
          <img src="/gulodLogo.png" alt="Logo" className="logo" />
          <span className="text-lg text-green-800 font-bold tracking-wide leading-6">
            Gulod National Highschool
          </span>
        </div>
        <div>
          <NavLink
            to="/requestor/dashboard"
            className={({ isActive }) =>
              `flex gap-4 items-center px-4 py-2 rounded-md ${isActive ? "bg-green-600 text-white" : "hover:bg-green-500/20"}`
            }
          >
            <LayoutDashboard />
            Dashboard
          </NavLink>
          <NavLink
            to="/requestor/new-request"
            className={({ isActive }) =>
              `flex gap-4 items-center px-4 py-2 rounded-md ${isActive ? "bg-green-600 text-white" : "hover:bg-green-500/20"}`
            }
          >
            <PlusCircleIcon />
            New Request
          </NavLink>
        </div>
      </div>

      <div className="mt-auto p-4 border-t">
        <button
          className="flex gap-4 px-4 py-2 items-center hover:bg-red-500/10 rounded-md w-full text-red-500"
          onClick={() => {
            logout();
          }}
        >
          <LogOutIcon />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
