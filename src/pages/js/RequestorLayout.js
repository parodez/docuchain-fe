import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/requestor/Sidebar";
import { useMe } from "../../hooks/useAuth";
import { BellIcon, SidebarOpen } from "lucide-react";
import { useEffect, useState } from "react";

const RequestorLayout = () => {
  const { data: user, isPending } = useMe();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setSideBarOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div className="flex h-full">
        <div className="w-full max-w-72 hidden lg:block">
          <Sidebar />
        </div>
        <div className="w-full h-full">
          <header className=" px-4 flex items-center border-b h-16 gap-3">
            <div className="lg:hidden p-2" onClick={() => setSideBarOpen(true)}>
              <SidebarOpen size={20} className="text-green-800" />
            </div>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full overflow-hidden">
                <img src="https://placehold.net/avatar-4.png" />
              </div>
              <span className="text-sm font-bold">{user?.data.email}</span>
            </div>
            <div className="ml-auto">
              <button className="size-9 rounded-full flex items-center justify-center">
                <BellIcon />
              </button>
            </div>
          </header>
          <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-64px)]">
            <Outlet />
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-50 ${
          sideBarOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            sideBarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSideBarOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-72 bg-white transition-transform duration-300 ease-in-out ${
            sideBarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>
      </div>
    </>
  );
};

export default RequestorLayout;
